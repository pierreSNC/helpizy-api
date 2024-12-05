const express = require("express");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts"); // Importer les routes des posts

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Pour parser les JSON dans les requêtes

// Routes
app.use("/api", postRoutes); // Préfixer les routes par `/api`



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});