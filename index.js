const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/Posts/posts");
const categoriesRoutes = require("./routes/Categories/categories");
const authorsRoutes = require("./routes/Authors/authors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", postsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", authorsRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});