const { User } = require("../../models");
const bcrypt = require("bcrypt");

const UserController = {
    register: async (req, res) => {
        const { email, lastname, firstname, profile_picture, password, allow_notification } = req.body;

        try {
            // Vérifier si l'email existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer l'utilisateur
            const newUser = await User.create({
                email,
                lastname,
                firstname,
                profile_picture,
                password: hashedPassword,
                allow_notification,
            });

            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Error registering user" });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Vérifier si l'utilisateur existe
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Vérifier le mot de passe
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            console.error("Error logging in user:", error);
            res.status(500).json({ message: "Error logging in user" });
        }
    },
};

module.exports = UserController;
