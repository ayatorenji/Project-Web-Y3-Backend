const mysql = require("mysql2");
const dbConfig = require("../config/db.config");
require("dotenv").config();
const connection = mysql.createConnection(dbConfig);
connection.connect((error)=>{
    if(error) console.log("MYSQL connection: " + error);
    else console.log("Successfully connected to the database");
});
module.exports = connection;