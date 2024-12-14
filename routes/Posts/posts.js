const express = require("express");
const PostController = require("../../controllers/Posts/PostController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Post
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - Post
 *     description: Get all posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_author:
 *                     type: integer
 *                   id_category:
 *                     type: string
 *                   active:
 *                     type: boolean
 *                   thumbnail:
 *                     type: string
 *                   video_url:
 *                     type: string
 *                   nb_like:
 *                     type: integer
 */
router.get("/posts", PostController.getAll);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     tags:
 *       - Post
 *     description: Get a single post by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_author:
 *                   type: integer
 *                 id_category:
 *                   type: string
 *                 active:
 *                   type: boolean
 *                 thumbnail:
 *                   type: string
 *                 video_url:
 *                   type: string
 *                 nb_like:
 *                   type: integer
 */
router.get("/post/:id", PostController.getOne);

/**
 * @swagger
 * /api/post:
 *   post:
 *     tags:
 *       - Post
 *     description: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_author:
 *                 type: integer
 *               id_category:
 *                 type: string
 *               active:
 *                 type: boolean
 *               thumbnail:
 *                 type: string
 *               video_url:
 *                 type: string
 *               nb_like:
 *                 type: integer
 *               translations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_lang:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     excerpt:
 *                       type: string
 *                     content:
 *                       type: string
 *                     additionnal_content:
 *                       type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post("/post", PostController.create);

/**
 * @swagger
 * /api/post/{id}:
 *   patch:
 *     tags:
 *       - Post
 *     description: Update an existing post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the post to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_author:
 *                 type: integer
 *               id_category:
 *                 type: string
 *               active:
 *                 type: boolean
 *               thumbnail:
 *                 type: string
 *               video_url:
 *                 type: string
 *               nb_like:
 *                 type: integer
 *               translations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_lang:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     excerpt:
 *                       type: string
 *                     content:
 *                       type: string
 *                     additionnal_content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.patch("/post/:id", PostController.update);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     tags:
 *       - Post
 *     description: Delete a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the post to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete("/post/:id", PostController.delete);

module.exports = router;
