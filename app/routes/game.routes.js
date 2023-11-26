const authJwt = require("../middleware/auth.jwt");
const express = require('express');
const gameController = require('../controllers/game.controller');

const router = express.Router();

// Create a new game and ensure the user is authenticated and has the 'admin' role
router.post('/', authJwt.verifyToken,  gameController.createGame);

// Retrieve all games (this doesn't have the authentication and admin checks)
router.get('/', gameController.getAllGames);

// Retrieve a game by its ID
router.get('/:gameId', gameController.getGameById);

// Update a game by its ID and ensure the user is authenticated and has the 'admin' role
router.put('/:gameId', authJwt.verifyToken, gameController.updateGame);

// Delete a game by its ID and ensure the user is authenticated and has the 'admin' role
router.delete('/:gameId', authJwt.verifyToken,  gameController.deleteGame);

module.exports = app => {
  app.use('/api/game', router);
};

