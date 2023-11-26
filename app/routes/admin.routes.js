const express = require("express");
const adminController = require("../controllers/admin.controller");
const authJwt = require("../middleware/auth.jwt");

const router = express.Router();

// Admin login route
router.post("/login", adminController.login);

// CRUD operations on users for admin
router.get("/users", adminController.getAllUsers);
router.post("/users", adminController.createUser);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

module.exports = app => {
    app.use("/api/admin", router);
};
