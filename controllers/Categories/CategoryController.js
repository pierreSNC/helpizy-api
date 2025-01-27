const { Category, CategoryLang } = require("../../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurer Multer pour gérer l'upload de fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Assurer que le dossier existe
        const dir = 'uploads/category';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Dossier de destination
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nom du fichier unique
    },
});

const upload = multer({ storage: storage });


const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.findAll({
                include: [
                    {
                        model: CategoryLang,
                        as: "translations",
                    },
                ],
            });
            res.status(200).json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Error fetching categories" });
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id, {
                include: [
                    {
                        model: CategoryLang,
                        as: "translations",
                    },
                ],
            });

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            res.status(200).json(category);
        } catch (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({ message: "Error fetching category" });
        }
    },

    create: async (req, res) => {
        const { active, translations } = req.body; // active est déjà une chaîne, translations est une chaîne JSON

        // Parse les traductions JSON pour les convertir en objet
        let parsedTranslations;
        try {
            parsedTranslations = JSON.parse(translations);  // Convertir la chaîne JSON en tableau d'objets
        } catch (error) {
            return res.status(400).json({ message: 'Erreur lors du parsing des traductions.' });
        }

        // Vérification du fichier téléchargé
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'L\'image est requise.' });
        }

        try {
            // Créer la catégorie sans l'image initialement
            const category = await Category.create({
                active,
                thumbnail: "", // L'image sera ajoutée plus tard
            });

            // Renommer et déplacer l'image
            const newFileName = `${category.id_category}.jpg`;
            const newFilePath = path.join('uploads/category', newFileName);
            fs.renameSync(file.path, newFilePath);

            // Mettre à jour l'URL de l'image dans la base de données
            const thumbnailUrl = `http://45.155.169.51/Helpizy-API/uploads/category/${newFileName}`;
            await category.update({ thumbnail: thumbnailUrl });

            // Vérifier et insérer les traductions
            if (parsedTranslations && Array.isArray(parsedTranslations)) {
                const categoryLangs = parsedTranslations.map((lang) => ({
                    ...lang,
                    id_category: category.id_category,  // Lier chaque traduction à la catégorie
                }));
                await CategoryLang.bulkCreate(categoryLangs);  // Insérer toutes les traductions dans la table
            }

            res.status(201).json({ message: "Category created successfully", category });
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Error creating category" });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;

        // Assurer que les données sont envoyées dans le bon format
        const { active, translations } = req.body;

        // Parsing de JSON pour translations
        let parsedTranslations;
        try {
            parsedTranslations = JSON.parse(translations);
        } catch (error) {
            return res.status(400).json({ message: 'Erreur lors du parsing des traductions.' });
        }

        try {
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Mise à jour de `active`
            if (active !== undefined) {
                category.active = active;
                await category.save();
            }

            // Mise à jour des traductions
            if (parsedTranslations && Array.isArray(parsedTranslations)) {
                for (const lang of parsedTranslations) {
                    const translation = await CategoryLang.findOne({
                        where: {
                            id_category: id,
                            id_lang: lang.id_lang,
                        },
                    });

                    if (translation) {
                        await translation.update(lang);
                    } else {
                        await CategoryLang.create({
                            ...lang,
                            id_category: id,
                        });
                    }
                }
            }

            // Gestion de l'image si elle est présente
            if (req.file) {
                const newFileName = `${category.id_category}.jpg`;
                const newFilePath = path.join('uploads/category', newFileName);

                // Déplacer l'image dans le dossier
                fs.renameSync(req.file.path, newFilePath);

                // Mettre à jour l'URL de l'image dans la base de données
                const thumbnailUrl = `http://45.155.169.51/Helpizy-API/uploads/category/${newFileName}`;
                await category.update({ thumbnail: thumbnailUrl });
            }

            res.status(200).json({ message: "Category updated successfully" });
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ message: "Error updating category" });
        }
    },



    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            await CategoryLang.destroy({ where: { id_category: id } });
            await category.destroy();

            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ message: "Error deleting category" });
        }
    },
};

module.exports = CategoryController;
