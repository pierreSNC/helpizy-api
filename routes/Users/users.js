const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/Users/UserController");
const authenticate = require("../../middlewares/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.get("/users", UserController.getAll);
router.post("/logout", UserController.logout);

router.get("/profile", authenticate, UserController.getProfile);

module.exports = router;
