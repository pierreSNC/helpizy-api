const express = require("express");
const router = express.Router();
const QuestionController = require("../../controllers/Questions/QuestionController");

router.get("/questions", QuestionController.getAll);
router.post("/question", QuestionController.create);
router.get("/question/:id", QuestionController.getOne);
router.patch("/question/:id", QuestionController.update);
router.delete("/question/:id", QuestionController.delete);

module.exports = router;
