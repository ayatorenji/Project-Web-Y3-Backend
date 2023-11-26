const sql = require("./db");

  
const PaymentMethod = function (paymentMethod) {
    this.paymentType =  paymentMethod.paymentType
  };

  PaymentMethod.create = (newPaymentMethod, result) => {
      sql.query("INSERT INTO payment_methods SET ?", newPaymentMethod, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Created user: ", {
      id: res.insertId,
      ...newPaymentMethod,
    });
    result(null, {
      id: res.insertId,
      ...newPaymentMethod,
    });
  });
}

PaymentMethod.read = (result) => {
    sql.query("SELECT * FROM payment_methods", (err, res) => {
        if (err) {
          console.log("Query error: " + err);
          result(err, null);
          return;
        }
        result(null, res);
      });
}

PaymentMethod.update = (id, data, result) => {
    
    
    sql.query(
      "UPDATE payment_methods SET paymentType=? WHERE id=?",
      [data.paymentType, parseInt(id)],
      (err, res) => {
        if (err) {
          console.log("Query error: " + err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          //this user id not found
          result({ kind: "not_found" }, null);
          //Mistake return so sent more than one response
          return;
        }
        console.log("Updated request: ", { id: id, ...data });
        result(null, { id: id, ...data });
      }
    );
}


PaymentMethod.del = (id, result) => {
    
    sql.query("DELETE FROM payment_methods WHERE id = ?", id, (err, res)=>{
      if(err){
        console.log("Query error: " + err)
        result(err, null)
        return;
      }
      if(res.affectedRows == 0){
        result({kind: "not_found"}, null)
        return;
      }
      console.log("Deleted id: ", id)
      result(null, {id: id})
    });
}

  module.exports = PaymentMethod;