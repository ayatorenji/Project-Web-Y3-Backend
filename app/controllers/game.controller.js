const Game = require("../models/game.model");

const createGame = (req, res) => {
    const game = new Game({
        name: req.body.name,
        image_url: req.body.image_url,
        price1: req.body.price1,
        price2: req.body.price2,
        price3: req.body.price3,
        price4: req.body.price4,
        price5: req.body.price5,
        price6: req.body.price6
    });

    Game.create(game, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while creating the game."
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve a game by its ID
const getGameById = (req, res) => {
    Game.findById(req.params.gameId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Game not found with ID ${req.params.gameId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving game with ID " + req.params.gameId
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Retrieve all games
const getAllGames = (req, res) => {
    Game.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving games."
            });
        } else {
            res.send(data);
        }
    });
};

// Update a game by its ID
const updateGame = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    Game.updateById(
        req.params.gameId,
        new Game(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Game not found with ID ${req.params.gameId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Game with ID " + req.params.gameId
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

// Delete a game by its ID
const deleteGame = (req, res) => {
    Game.remove(req.params.gameId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Game not found with ID ${req.params.gameId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Game with ID " + req.params.gameId
                });
            }
        } else {
            res.send({ message: "Game was deleted successfully!" });
        }
    });
};

module.exports = {
    createGame,
    getGameById,
    getAllGames,
    updateGame,
    deleteGame
};
