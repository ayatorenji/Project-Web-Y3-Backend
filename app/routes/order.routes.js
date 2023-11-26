const express = require('express');
const router = express.Router();

const orders = require('../controllers/order.controller.js');

// Create a new Order
router.post('/create', orders.create);

// Retrieve an Order by orderId
router.get('/:orderId', orders.findOne);

// Retrieve all Orders by userId(Game id)
router.get('/user/:userId', orders.findByUserId);

router.get('/all', orders.getAllOrders);

module.exports = app => {
  app.use('/api/orders', router);
};