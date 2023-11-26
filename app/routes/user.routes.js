const authJwt = require("../middleware/auth.jwt");
const User = require("../models/user.model");
const user_controller = require("../controllers/user.controller");
const express = require("express");
var router = express.Router();

router.get("/:us", user_controller.validUsername);
router.post("/signup", user_controller.createNewUser);
router.post("/login", user_controller.login);
router.get("/", user_controller.getAllUsers);  

// Authentication required for these routes
router.put("/:id", authJwt.verifyToken, user_controller.updateUser);
router.delete("/:id", authJwt.verifyToken, user_controller.deleteUser);


module.exports = app => {
    app.use("/api/auth", router);
};
