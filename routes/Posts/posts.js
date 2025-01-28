const express = require("express");
const PostController = require("../../controllers/Posts/PostController");

const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurer Multer pour gérer l'upload de fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Assurer que le dossier existe
        const dir = 'uploads/category';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Dossier de destination
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nom du fichier unique
    },
});

const upload = multer({ storage: storage });
/**
 * @swagger
 * tags:
 *   - name: Post
 */

/**
 * @swagger
 * /api/post/search:
 *   get:
 *     tags:
 *       - Post
 *     summary: Search posts
 *     description: Search for posts whose translations match the given query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The search term to look for in title, excerpt, or content
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array of posts matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_post:
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
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   translations:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_lang:
 *                           type: integer
 *                         title:
 *                           type: string
 *                         excerpt:
 *                           type: string
 *                         content:
 *                           type: string
 *                         additionnal_content:
 *                           type: string
 */
router.get("/post/search", PostController.search)

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
router.patch("/post/:id", upload.single('thumbnail'), PostController.update);

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
