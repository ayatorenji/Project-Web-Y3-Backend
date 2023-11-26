  const sql = require('./db');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const scKey = require ('../config/jwt.config');
  const fs = require('fs');

  const Admin = function(admin) {
    this.fullname = admin.fullname;
    this.username = admin.username;
    this.password = admin.password;
  }

  const expireTime = '1h';

  Admin.login = (account, result) => {
      sql.query("SELECT * FROM admins WHERE username = ?", [account.username], (err, res) => {
          if (err) {
              console.log("Query error: ", err);
              result(err, null);
              return;
          }
          if (res.length) {
              const validPassword = bcrypt.compareSync(account.password, res[0].password);
              if (validPassword) {
                  const token = jwt.sign({ id: res[0].id }, scKey.secret, {
                      expiresIn: expireTime,
                  });
                  console.log("Login success. Token: ", token);
                  result(null, { ...res[0], accessToken: token });
              } else {
                  console.log("Invalid password.");
                  result({ kind: "invalid_password" }, null);
              }
          } else {
              result({ kind: "not_found" }, null);
          }
      });
  };
    Admin.createUser = (user, result) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      sql.query("INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)", 
      [user.fullname, user.username, hashedPassword], 
      (err, res) => {
          if(err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }
          result(null, { id: res.insertId, ...user });
      });
  };

  
// Create a new user
Admin.createUser = (newUser, result) => {
    const salt = bcrypt.genSaltSync(10);
    newAdmin.password = bcrypt.hashSync(newAdmin.password, salt);
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      result(null, { id: res.insertId, ...newUser });
  });
};

// Get all users
Admin.getAllUsers = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      result(null, res);
  });
};

// Get a single user by ID
Admin.getUserById = (userId, result) => {
  sql.query("SELECT * FROM users WHERE id = ?", [userId], (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if (res.length) {
          result(null, res[0]);
      } else {
          result({ kind: "not_found" }, null);
      }
  });
};

// Update a user
Admin.updateUser = (userId, user, result) => {
  sql.query("UPDATE users SET fullname = ?, email = ?, username = ?, password = ?, img = ? WHERE id = ?", 
  [user.fullname, user.email, user.username, user.password, user.img, userId], 
  (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
      }
      result(null, { id: userId, ...user });
  });
};

// Delete a user
Admin.deleteUser = (userId, result) => {
  sql.query("DELETE FROM users WHERE id = ?", [userId], (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
      }
      result(null, res);
  });
};

module.exports = Admin;
