const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts"); // Importer les routes des posts
const categoriesRoutes = require("./routes/Categories/categories");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", postsRoutes);
app.use("/api", categoriesRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});