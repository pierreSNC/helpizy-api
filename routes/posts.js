const express = require("express");
const PostController = require("../controllers/Posts/PostController");

const router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/post/:id", PostController.getOne);
router.post("/post", PostController.create);
router.patch("/post/:id", PostController.update);
router.delete("/post/:id", PostController.delete);

module.exports = router;
