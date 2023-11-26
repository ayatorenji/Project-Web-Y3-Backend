const sql = require('./db');

const Game = function(game) {
    this.name = game.name;
    this.image_url = game.image_url;
    this.package = game.package;
};

Game.create = (newGame, result) => {
    sql.query("INSERT INTO games SET ?", newGame, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created game: ", { id: res.insertId, ...newGame });
        result(null, { id: res.insertId, ...newGame });
    });
};

Game.findById = (gameId, result) => {
    sql.query(`SELECT * FROM games WHERE id = ${gameId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found game: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Game.updateById = (gameId, game, result) => {
    sql.query(
        "UPDATE games SET name = ?, image_url = ?, package = ? WHERE id = ?",
        [game.name, game.image_url, game.package, gameId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated game: ", { id: gameId, ...game });
            result(null, { id: gameId, ...game });
        }
    );
};

Game.remove = (gameId, result) => {
    sql.query("DELETE FROM games WHERE id = ?", gameId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted game with id: ", gameId);
        result(null, res);
    });
};

Game.getAll = (result) => {
    sql.query("SELECT * FROM games", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("games: ", res);
        result(null, res);
    });
};


module.exports = Game;
