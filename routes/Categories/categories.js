const express = require("express");
const CategoryController = require("../../controllers/Categories/CategoryController");

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
 *   - name: Category
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Category
 *     description: Get a list of all categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_category:
 *                     type: integer
 *                   active:
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
 *                         excerpt:
 *                           type: string
 *                         content:
 *                           type: string
 */
router.get("/categories", CategoryController.getAll);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     description: Get details of a single category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_category:
 *                   type: integer
 *                 active:
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
 *                       excerpt:
 *                         type: string
 *                       content:
 *                         type: string
 */
router.get("/category/:id", CategoryController.getOne);

/**
 * @swagger
 * /api/category:
 *   post:
 *     tags:
 *       - Category
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
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
 *                     excerpt:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       201:
 *         description: Category successfully created
 */
router.post("/category", upload.single('thumbnail'), CategoryController.create);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     tags:
 *       - Category
 *     description: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID to update
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
 *     responses:
 *       200:
 *         description: Category successfully updated
 */
router.patch("/category/:id", CategoryController.update);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     description: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category successfully deleted
 */
router.delete("/category/:id", CategoryController.delete);

module.exports = router;
