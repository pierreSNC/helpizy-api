const { Author } = require("../../models");

const AuthorController = {
    getAll: async (req, res) => {
        try {
            const authors = await Author.findAll({
                include: { association: "posts" },
            });
            res.status(200).json(authors);
        } catch (error) {
            console.error("Error fetching authors:", error);
            res.status(500).json({ message: "Error fetching authors" });
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const author = await Author.findByPk(id, {
                include: { association: "post" },
            });

            if (!author) {
                return res.status(404).json({ message: "Author not found" });
            }

            res.status(200).json(author);
        } catch (error) {
            console.error("Error fetching author:", error);
            res.status(500).json({ message: "Error fetching author" });
        }
    },

    create: async (req, res) => {
        const { email, lastname, firstname, profile_picture, password, role } = req.body;

        try {
            const author = await Author.create({
                email,
                lastname,
                firstname,
                profile_picture,
                password,
                role,
            });

            res.status(201).json({ message: "Author created successfully", author });
        } catch (error) {
            console.error("Error creating author:", error);
            res.status(500).json({ message: "Error creating author" });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { email, lastname, firstname, profil_picture, password, role } = req.body;

        try {
            const author = await Author.findByPk(id);

            if (!author) {
                return res.status(404).json({ message: "Author not found" });
            }

            await author.update({ email, lastname, firstname, profil_picture, password, role });

            res.status(200).json({ message: "Author updated successfully", author });
        } catch (error) {
            console.error("Error updating author:", error);
            res.status(500).json({ message: "Error updating author" });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const author = await Author.findByPk(id);

            if (!author) {
                return res.status(404).json({ message: "Author not found" });
            }

            await author.destroy();
            res.status(200).json({ message: "Author deleted successfully" });
        } catch (error) {
            console.error("Error deleting author:", error);
            res.status(500).json({ message: "Error deleting author" });
        }
    },
};

module.exports = AuthorController;
