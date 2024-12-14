const express = require("express");
const router = express.Router();
const QuestionController = require("../../controllers/Questions/QuestionController");

/**
 * @swagger
 * tags:
 *   - name: Question
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     tags:
 *       - Question
 *     description: Get a list of all questions
 *     responses:
 *       200:
 *         description: A list of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_question:
 *                     type: integer
 *                   active:
 *                     type: boolean
 *                   isSpotlight:
 *                     type: boolean
 *                   translations:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_lang:
 *                           type: integer
 *                         title:
 *                           type: string
 *                         content:
 *                           type: string
 */
router.get("/questions", QuestionController.getAll);

/**
 * @swagger
 * /api/question/{id}:
 *   get:
 *     tags:
 *       - Question
 *     description: Get a specific question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the question
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_question:
 *                   type: integer
 *                 active:
 *                   type: boolean
 *                 isSpotlight:
 *                   type: boolean
 *                 translations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_lang:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 */
router.get("/question/:id", QuestionController.getOne);

/**
 * @swagger
 * /api/question:
 *   post:
 *     tags:
 *       - Question
 *     description: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *               isSpotlight:
 *                 type: boolean
 *               translations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_lang:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       201:
 *         description: Question successfully created
 */
router.post("/question", QuestionController.create);

/**
 * @swagger
 * /api/question/{id}:
 *   patch:
 *     tags:
 *       - Question
 *     description: Update a specific question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the question to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *               isSpotlight:
 *                 type: boolean
 *               translations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_lang:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Question successfully updated
 */
router.patch("/question/:id", QuestionController.update);

/**
 * @swagger
 * /api/question/{id}:
 *   delete:
 *     tags:
 *       - Question
 *     description: Delete a specific question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the question to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question successfully deleted
 */
router.delete("/question/:id", QuestionController.delete);

module.exports = router;
