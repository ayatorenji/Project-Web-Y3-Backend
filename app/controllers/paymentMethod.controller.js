const PaymentMethod = require('../models/paymentMethod.model');

// Create a new payment method
exports.create = (req, res) => {
    const paymentMethod = new PaymentMethod({
        paymentType: req.body.paymentType
    });

    PaymentMethod.create(paymentMethod, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the PaymentMethod.'
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve all payment methods
exports.read = (req, res) => {
    PaymentMethod.read((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving payment methods.'
            });
        } else {
            res.send(data);
        }
    });
};

// Update a payment method by ID
exports.update = (req, res) => {
    const paymentMethod = new PaymentMethod({
        paymentType: req.body.paymentType
    });

    PaymentMethod.update(req.params.id, paymentMethod, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found PaymentMethod with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating PaymentMethod with id ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete a payment method by ID
exports.del = (req, res) => {
    PaymentMethod.del(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found PaymentMethod with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete PaymentMethod with id ${req.params.id}.`
                });
            }
        } else {
            res.send({ message: 'PaymentMethod was deleted successfully!' });
        }
    });
};
