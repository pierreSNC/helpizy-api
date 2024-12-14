const express = require("express");
const AuthorController = require("../../controllers/Authors/AuthorController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Author
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     tags:
 *       - Author
 *     description: Get a list of all authors
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_author:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   profile_picture:
 *                     type: string
 */
router.get("/authors", AuthorController.getAll);

/**
 * @swagger
 * /api/author/{id}:
 *   get:
 *     tags:
 *       - Author
 *     description: Get details of a single author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The author ID to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_author:
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
router.get("/author/:id", AuthorController.getOne);

/**
 * @swagger
 * /api/author:
 *   post:
 *     tags:
 *       - Author
 *     description: Create a new author
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
 *               profile_picture:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author successfully created
 */
router.post("/author", AuthorController.create);

/**
 * @swagger
 * /api/author/{id}:
 *   patch:
 *     tags:
 *       - Author
 *     description: Update an author's details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The author ID to update
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
 *               profile_picture:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author details successfully updated
 */
router.patch("/author/:id", AuthorController.update);

/**
 * @swagger
 * /api/author/{id}:
 *   delete:
 *     tags:
 *       - Author
 *     description: Delete an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The author ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author successfully deleted
 */
router.delete("/author/:id", AuthorController.delete);

module.exports = router;
