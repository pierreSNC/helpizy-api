const { Post, PostLang } = require("../../models");
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');

const PostController = {
    getAll: async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: PostLang,
                        as: "translations",
                    },
                ],
            });
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ message: "Error fetching posts" });
        }
    },

    // Créer un article
    create: async (req, res) => {
        const { id_author, id_category, active, video_url, nb_like, translations } = req.body;

        let parsedTranslations;
        try {
            parsedTranslations = JSON.parse(translations);
        } catch (error) {
            return res.status(400).json({ message: 'Erreur lors du parsing des traductions.' });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Thumbnail image is required.' });
        }

        try {
            const post = await Post.create({
                id_author,
                id_category,
                active,
                video_url,
                nb_like,
                thumbnail: '', // Placeholder for now
            });

            const newFileName = `${post.id_post}.jpg`;
            const newFilePath = path.join('uploads/post', newFileName);
            fs.renameSync(file.path, newFilePath);

            const thumbnailUrl = `http://45.155.169.51/Helpizy-API/uploads/post/${newFileName}`;
            await post.update({ thumbnail: thumbnailUrl });

            if (parsedTranslations && Array.isArray(parsedTranslations)) {
                const postLangs = parsedTranslations.map((lang) => ({
                    ...lang,
                    id_post: post.id_post,
                }));
                await PostLang.bulkCreate(postLangs);
            }

            res.status(201).json({ message: "Post created successfully", post });
        } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ message: "Error creating post" });
        }
    },

    // Récupérer un article par ID
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: PostLang,
                        as: "translations",
                    },
                ],
            });

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            res.status(200).json(post);
        } catch (error) {
            console.error("Error fetching post:", error);
            res.status(500).json({ message: "Error fetching post" });
        }
    },

    // Mettre à jour un article
    update: async (req, res) => {
        const { id } = req.params;
        const { id_author, id_category, active, video_url, nb_like, translations } = req.body;

        // Parse des traductions JSON
        let parsedTranslations;
        try {
            parsedTranslations = JSON.parse(translations); // Convertir la chaîne JSON en tableau d'objets
        } catch (error) {
            return res.status(400).json({ message: 'Erreur lors du parsing des traductions.' });
        }

        try {
            // Récupérer le post à mettre à jour
            const post = await Post.findByPk(id);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            // Mise à jour des champs principaux
            post.id_author = id_author || post.id_author;
            post.id_category = id_category || post.id_category;
            post.active = active !== undefined ? active : post.active;
            post.video_url = video_url || post.video_url;
            post.nb_like = nb_like !== undefined ? nb_like : post.nb_like;

            // Gestion de l'image (si un fichier est fourni)
            const file = req.file;
            if (file) {
                const newFileName = `${post.id_post}.jpg`;
                const newFilePath = path.join('uploads/post', newFileName);

                // Supprimer l'ancienne image si elle existe
                if (post.thumbnail) {
                    const oldFilePath = path.join('uploads/post', path.basename(post.thumbnail));
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }

                // Déplacer la nouvelle image et mettre à jour la base de données
                fs.renameSync(file.path, newFilePath);
                const thumbnailUrl = `http://45.155.169.51/Helpizy-API/uploads/post/${newFileName}`;
                post.thumbnail = thumbnailUrl;
            }

            // Sauvegarder les modifications dans le post
            await post.save();

            // Gestion des traductions
            if (parsedTranslations && Array.isArray(parsedTranslations)) {
                for (const lang of parsedTranslations) {
                    const postLang = await PostLang.findOne({
                        where: {
                            id_post: id,
                            id_lang: lang.id_lang,
                        },
                    });

                    if (postLang) {
                        // Mettre à jour la traduction existante
                        await postLang.update(lang);
                    } else {
                        // Créer une nouvelle traduction si elle n'existe pas
                        await PostLang.create({
                            ...lang,
                            id_post: id,
                        });
                    }
                }
            }

            res.status(200).json({ message: "Post updated successfully", post });
        } catch (error) {
            console.error("Error updating post:", error);
            res.status(500).json({ message: "Error updating post" });
        }
    },

    // Supprimer un article
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            await PostLang.destroy({ where: { id_post: id } });

            await post.destroy();

            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).json({ message: "Error deleting post", error: error });
        }
    },

    // Chercher un article
    search: async (req, res) => {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Query parameter 'query' is required" });
        }

        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: PostLang,
                        as: "translations",
                        where: {
                            [Op.or]: [
                                { title: { [Op.like]: `%${query}%` } },
                                { excerpt: { [Op.like]: `%${query}%` } },
                                { content: { [Op.like]: `%${query}%` } },
                            ],
                        },
                    },
                ],
            });

            return res.json(posts);
        } catch (error) {
            console.error("Error searching posts:", error);
            return res.status(500).json({ message: "Error searching posts" });
        }
    },

};

module.exports = PostController;
