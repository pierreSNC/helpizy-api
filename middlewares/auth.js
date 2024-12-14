const jwt = require("jsonwebtoken");

const SECRET_KEY = "test";

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticate;
