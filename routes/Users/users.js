const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/Users/UserController");
const authenticate = require("../../middlewares/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
/**
 * @swagger
 * /api/users:
 *   get:
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
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 */
router.get("/users", UserController.getAll);
router.post("/logout", UserController.logout);

router.get("/profile", authenticate, UserController.getProfile);

module.exports = router;
