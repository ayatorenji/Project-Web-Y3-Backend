const User = require("../models/user.model")
const bcrypt = require("bcryptjs");

const validUsername = (req, res) => {
    User.checkUsername(req.params.us, (err, data)=>{
        if(err) {
            if(err.kind == "not_found"){
                res.send({
                    message: "Not Found: " + req.params.us,
                    valid: true
                });
            }
            else {
                res.status(500).send({ 
                    message: "Error query: " + req.params.us
                });
            }
        }else{
            res.send({record: data, valid: false});
        }
    });
};

const createNewUser = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const salt = bcrypt.genSaltSync(10);
    const userObj = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        img: req.body.img
    });
    User.create(userObj, (err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    });
};

const login = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const acc = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.loginModel(acc, (err, data)=>{
        if(err){
            if(err.kind == "not_found"){
                res.status(401).send({message: "Not found " + req.body.username});
            }
            else if(err.kind == "invalid_pass"){
                res.status(401).send({message: "Invalid Password"});
            }else{
                res.status(500).send({message: "Query error." });
            }
        }else res.send(data);
    });
};

const getAllUsers = (req,res)=>{
    User.getAllRecords((err, data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
};

// Update user
const updateUser = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const userId = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const userObj = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        img: req.body.img
    });
    User.updateById(userId, userObj, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: `Not found User with id ${userId}.`});
            } else {
                res.status(500).send({message: "Error updating User with id " + userId});
            }
        } else res.send(data);
    });
};

// Delete user
const deleteUser = (req, res) => {
    const userId = req.params.id;
    User.remove(userId, (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(404).send({message: `Not found User with id ${userId}.`});
            } else {
                res.status(500).send({message: "Could not delete User with id " + userId});
            }
        } else res.send({message: `User was deleted successfully!`});
    });
};

module.exports = { validUsername, createNewUser, login, getAllUsers, updateUser, deleteUser };