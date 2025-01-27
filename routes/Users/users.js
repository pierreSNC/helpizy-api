const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/Users/UserController");
const authenticate = require("../../middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: User
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - User
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 */
router.post("/register", UserController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully, returns a token
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     description: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_user:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 */
router.get("/users", UserController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - User
 *     description: Update user details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details updated successfully
 */
router.patch("/user/:id", UserController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/user/:id", UserController.delete);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - User
 *     description: Logout a user (invalidate the token)
 *     responses:
 *       200:
 *         description: User successfully logged out
 */
router.post("/logout", UserController.logout);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - User
 *     description: Get the profile of the logged-in user
 *     responses:
 *       200:
 *         description: User profile details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 profile_picture:
 *                   type: string
 */
router.get("/profile", authenticate, UserController.getProfile);

router.get("/user/:id", UserController.getOne);
module.exports = router;
