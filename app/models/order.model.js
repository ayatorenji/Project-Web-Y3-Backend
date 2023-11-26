const sql = require('./db');

const Order = function(order) {
    this.game_id = order.game_id;
    this.user_game_id = order.user_game_id;
    this.selected_price = order.selected_price;
    this.status = order.status || 'Pending'; // Default value is 'Pending'
};

Order.create = (newOrder, result) => {
    // First, get the game based on game_id
    sql.query("SELECT * FROM games WHERE id = ?", [newOrder.game_id], (err, gameResult) => {
        if (err) {
            result(err, null);
            return;
        }
        
        // Check if the game exists
        if (!gameResult.length) {
            result(new Error("Game not found."), null);
            return;
        }

        const game = gameResult[0];
        const prices = [game.price1, game.price2, game.price3, game.price4, game.price5, game.price6];
        
        // Validate if selected_price is one of the game prices
        if (!prices.includes(newOrder.selected_price)) {
            result(new Error("Invalid price selected."), null);
            return;
        }

        // If validation passed, insert into orders table
        sql.query("INSERT INTO orders SET ?", newOrder, (insertErr, insertResult) => {
            if (insertErr) {
                result(insertErr, null);
                return;
            }
            console.log("Created order: ", { id: insertResult.insertId, ...newOrder });
            result(null, { id: insertResult.insertId, ...newOrder });
        });
    });
};

Order.findById = (orderId, result) => {
    sql.query(`SELECT * FROM orders WHERE id = ${orderId}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log("found order: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


// Note: We'll keep the other methods as they were before
Order.findByUserId = (userId, result) => {
  sql.query(`SELECT * FROM orders WHERE user_game_id = ?`, [userId], (err, res) => {
    if(err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
      if(res.length) {
          console.log("found orders for user: ", res);
          result(null, res);
          return;
      }
      result({ kind: "not_found" }, null);
  });
};
Order.getAll = (result) => {
    sql.query("SELECT * FROM orders", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("orders: ", res);
        result(null, res);
    });
};

module.exports = Order;

