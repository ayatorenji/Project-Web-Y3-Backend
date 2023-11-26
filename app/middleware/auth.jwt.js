const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");

const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }
    jwt.verify(token, scKey.secret, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized" });
        req.id = decoded.id;
        next();
    });
};

// const isAdmin = (req, res, next) => {
//     User.findById(req.id).then(user => {
//         if (user.role === 'admin') {
//             next();
//             return;
//         }
//         res.status(403).send({ message: "Require Admin Role!" });
//         return;
//     });
// };

module.exports = {
    verifyToken,
    // isAdmin
};
