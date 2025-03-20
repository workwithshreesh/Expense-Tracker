const jwt = require("jsonwebtoken");

const SECRET_KEY = "expensemgm";

function authenticateUser(req, res, next) {
    const token = req.header("Authorization"); 

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const actualToken = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token; 

    try {
        const decoded = jwt.verify(actualToken, SECRET_KEY);
        req.user = decoded; // Attach user info to the request
        next(); // Move to the next middleware
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

module.exports = authenticateUser;
