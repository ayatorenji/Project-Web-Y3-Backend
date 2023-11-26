const authJWT = require("../middleware/auth.jwt")
module.exports = (app) => {
    const paymentMethod_controller = require("../controllers/paymentMethod.controller")
    var router = require("express").Router();
    router.post("/new", paymentMethod_controller.create);  
    router.get("/", paymentMethod_controller.read);       
    router.put("/:id", paymentMethod_controller.update); 
    router.delete("/:id",paymentMethod_controller.del);
    app.use("/api/payment", router);
};