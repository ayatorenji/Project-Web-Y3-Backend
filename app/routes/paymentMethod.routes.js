const authJWT = require("../middleware/auth.jwt")
module.exports = (app) => {
    const paymentMethod_controller = require("../controllers/paymentMethod.controller")
    var router = require("express").Router();
    router.post("/new",authJWT.verifyToken, paymentMethod_controller.create);  
    router.get("/",authJWT.verifyToken, paymentMethod_controller.read);       
    router.put("/:id",authJWT.verifyToken, paymentMethod_controller.update); 
    router.delete("/:id",authJWT.verifyToken, paymentMethod_controller.del);
    app.use("/api/payment", router);
};