const { Post, PostLang } = require("../../models");

const PostController = {
    // Récupérer tous les articles
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
        const { id_author, id_category, active, thumbnail, video_url, nb_like, translations } = req.body;

        try {
            const post = await Post.create({
                id_author,
                id_category,
                active,
                thumbnail,
                video_url,
                nb_like,
            });

            if (translations && Array.isArray(translations)) {
                const postLangs = translations.map((lang) => ({
                    ...lang,
                    id_post: post.id,
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
        const { id_author, id_category, active, thumbnail, video_url, nb_like, translations } = req.body;

        try {
            const post = await Post.findByPk(id);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            await post.update({
                id_author,
                id_category,
                active,
                thumbnail,
                video_url,
                nb_like,
            });

            if (translations && Array.isArray(translations)) {
                for (const lang of translations) {
                    const postLang = await PostLang.findOne({
                        where: { id_post: id, id_lang: lang.id_lang },
                    });

                    if (postLang) {
                        await postLang.update(lang);
                    } else {
                        await PostLang.create({ ...lang, id_post: id });
                    }
                }
            }

            res.status(200).json({ message: "Post updated successfully" });
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
    }

};

module.exports = PostController;
