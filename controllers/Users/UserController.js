const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const UserController = {
    register: async (req, res) => {
        const { email, lastname, firstname, profile_picture, password, allow_notification, role } = req.body;

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                lastname,
                firstname,
                profile_picture,
                password: hashedPassword,
                allow_notification,
                role
            });

            const token = jwt.sign(
                { id_user: newUser.id_user, email: newUser.email, role: newUser.role },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(201).json({
                message: "User registered successfully",
                token,
                user: {
                    id_user: newUser.id_user,
                    email: newUser.email,
                    lastname: newUser.lastname,
                    firstname: newUser.firstname,
                    profile_picture: newUser.profile_picture,
                    role: newUser.role
                },
            });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Error registering user" });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id_user: user.id_user, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ message: "Error logging in" });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.findAll();

            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }

            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Error fetching users" });
        }
    },

    getProfile: async (req, res) => {
        const { id_user } = req.user;
        try {
            const user = await User.findByPk(id_user, {
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).json({ message: "Error fetching user profile" });
        }
    },

    logout: (req, res) => {
        try {
            res.status(200).json({ message: "Successfully logged out" });
        } catch (error) {
            console.error("Error logging out:", error);
            res.status(500).json({ message: "Error logging out" });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { email, lastname, firstname, profile_picture, password, allow_notification, role } = req.body;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (email) user.email = email;
            if (lastname) user.lastname = lastname;
            if (firstname) user.firstname = firstname;
            if (profile_picture) user.profile_picture = profile_picture;
            if (role) user.role = role;
            if (typeof allow_notification !== "undefined") user.allow_notification = allow_notification;

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            await user.save();

            res.status(200).json({ message: "User updated successfully", user });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Error updating user" });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        console.log(req.params)
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.destroy();

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Error deleting user" });
        }
    },
};

module.exports = UserController;
