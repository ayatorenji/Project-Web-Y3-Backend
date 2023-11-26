const sql = require('./db');

const Order = function(order) {
    this.game_id = order.game_id;
    this.user_game_id = order.user_game_id;
    this.username = order.username;
    this.selected_package = order.selected_package;
    this.status = order.status || 'Pending';
  };

  Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newOrder });
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

