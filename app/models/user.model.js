const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; 

const User = function(user){
    this.fullname = user.fullname;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.img = user.img;
}
User.checkUsername = (username, result)=>{
    sql.query("SELECT * FROM users WHERE username='"+username+"'",(err,res)=>{
        if(err){
            console.log("Error: " + err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Found username: " + res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found"}, null);
    });
};

User.create = (newUser, result)=>{
    sql.query("INSERT INTO users SET ?", newUser, (err, res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
        result(null, {id: res.insertId, ...newUser, userType: "user", accessToken: token});
        console.log("Created user:", {id: res.insertId, ...newUser, userType: "user", accessToken: token});
    });
};

User.loginModel = (account, result)=>{
    sql.query("SELECT * FROM users WHERE username=?", [account.username], (err, res)=>{
        if(err){
            console.log("err:" + err);
            result(err, null);
            return;
        }
        if(res.length){
            const validPassword = bcrypt.compareSync(account.password, res[0].password);
            if(validPassword){
                const token = jwt.sign({id: res.insertId}, scKey.secret, {expiresIn: expireTime});
                console.log("Login success. Token: " + token);
                res[0].accessToken = token;
                result(null, res[0]);
                return;
            }else{
                console.log("Password not match");
                result({kind: "invalid_pass"}, null);
                return;
            }
        }
        result({kind: "not_found"}, null);
    });
};

User.getAllRecords = (result)=>{
    sql.query("SELECT * FROM users", (err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
};

// Update user by ID
User.updateById = (userId, user, result) => {
    sql.query("UPDATE users SET fullname = ?, email = ?, username = ?, password = ?, img = ? WHERE id = ?", 
    [user.fullname, user.email, user.username, user.password, user.img, userId], 
    (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            // No user found with the ID
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated user: ", { id: userId, ...user });
        result(null, { id: userId, ...user });
    });
};

// Delete user by ID
User.remove = (userId, result) => {
    sql.query("DELETE FROM users WHERE id = ?", userId, (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            // No user found with the ID
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted user with id: ", userId);
        result(null, res);
    });
};


module.exports = User;