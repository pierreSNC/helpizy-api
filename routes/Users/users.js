const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/Users/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/user/:id", UserController.update);

module.exports = router;
