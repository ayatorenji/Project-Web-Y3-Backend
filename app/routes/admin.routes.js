const express = require("express");
const adminController = require("../controllers/admin.controller");
const authJwt = require("../middleware/auth.jwt");

const router = express.Router();

// Admin login route
router.post("/login", adminController.login);

// CRUD operations on users for admin
router.get("/users", authJwt.verifyToken, adminController.getAllUsers);
router.post("/users", authJwt.verifyToken, adminController.createUser);
router.get("/users/:id", authJwt.verifyToken, adminController.getUserById);
router.put("/users/:id", authJwt.verifyToken, adminController.updateUser);
router.delete("/users/:id", authJwt.verifyToken, adminController.deleteUser);

module.exports = app => {
    app.use("/api/admin", router);
};
