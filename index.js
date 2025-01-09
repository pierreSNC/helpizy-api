const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

const postsRoutes = require("./routes/Posts/posts");
const categoriesRoutes = require("./routes/Categories/categories");
const authorsRoutes = require("./routes/Authors/authors");
const questionsRoutes = require("./routes/Questions/questions");
const usersRoutes = require("./routes/Users/users");

const app = express();
app.use(cors());
app.options('*', cors());
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use('/helpizy/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api", postsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", authorsRoutes);
app.use("/api", questionsRoutes);
app.use("/api", usersRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});