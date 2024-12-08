const express = require("express");
const CategoryController = require("../../controllers/Categories/CategoryController");

const router = express.Router();

// Routes
router.get("/categories", CategoryController.getAll); // Récupérer toutes les catégories
router.get("/category/:id", CategoryController.getOne); // Récupérer une catégorie par ID
router.post("/category", CategoryController.create); // Créer une catégorie
router.patch("/category/:id", CategoryController.update); // Mettre à jour une catégorie
router.delete("/category/:id", CategoryController.delete); // Supprimer une catégorie

module.exports = router;
