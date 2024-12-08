const { Category, CategoryLang } = require("../../models");

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
        const { active, translations } = req.body;

        try {
            const category = await Category.create({ active });

            if (translations && Array.isArray(translations)) {
                const categoryLangs = translations.map((lang) => ({
                    ...lang,
                    id_category: category.id,
                }));
                await CategoryLang.bulkCreate(categoryLangs);
            }

            res.status(201).json({ message: "Category created successfully", category });
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Error creating category" });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { active, translations } = req.body;

        try {
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Mise à jour de la propriété `active`
            if (active !== undefined) {
                category.active = active;
                await category.save();
            }

            // Mise à jour des traductions
            if (translations && Array.isArray(translations)) {
                for (const lang of translations) {
                    const translation = await CategoryLang.findOne({
                        where: {
                            id_category: id,
                            id_lang: lang.id_lang,
                        },
                    });

                    if (translation) {
                        // Si la traduction existe, on la met à jour
                        await translation.update(lang);
                    } else {
                        // Si elle n'existe pas, on la crée
                        await CategoryLang.create({
                            ...lang,
                            id_category: id,
                        });
                    }
                }
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
