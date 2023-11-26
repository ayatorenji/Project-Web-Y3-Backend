const Order = require("../models/order.model.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const order = new Order({
        game_id: req.body.game_id,
        user_game_id: req.body.user_game_id,
        selected_price: req.body.selected_price,
        status: req.body.status
    });

    Order.create(order, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Order.findById(req.params.orderId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Order with id " + req.params.orderId
                });
            }
        } else res.send(data);
    });
};


exports.findByUserId = (req, res) => {
    Order.findByUserId(req.params.userId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `No orders found for user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving orders for user with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};
 

exports.getAllOrders = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
};




