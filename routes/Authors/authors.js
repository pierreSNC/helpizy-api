const express = require("express");
const AuthorController = require("../../controllers/Authors/AuthorController");

const router = express.Router();

router.get("/authors", AuthorController.getAll);
router.get("/author/:id", AuthorController.getOne);
router.post("/author", AuthorController.create);
router.patch("/author/:id", AuthorController.update);
router.delete("/author/:id", AuthorController.delete);

module.exports = router;
