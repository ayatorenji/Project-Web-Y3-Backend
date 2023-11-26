const Admin = require("../models/admin.model");

const login = (req, res) => {
    Admin.login(req.body, (err, data) => {
        if (err) {
            if (err.kind === "invalid_password") {
                res.status(401).send({ message: "Invalid password" });
            } else if (err.kind === "not_found") {
                res.status(404).send({ message: "Admin not found" });
            } else {
                res.status(500).send({ message: "Error logging in" });
            }
        } else {
            res.send(data);
        }
    });
};

const getAllUsers = (req, res) => {
    Admin.getAllUsers((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
};

const createUser = (req, res) => {
    Admin.createUser(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
};

const getUserById = (req, res) => {
    Admin.getUserById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found User with id ${req.params.id}.` });
            } else {
                res.status(500).send(err);
            }
        } else {
            res.send(data);
        }
    });
};

const updateUser = (req, res) => {
    Admin.updateUser(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found User with id ${req.params.id}.` });
            } else {
                res.status(500).send(err);
            }
        } else {
            res.send(data);
        }
    });
};
const deleteUser = (req, res) => {
    Admin.deleteUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found User with id ${req.params.id}.` });
            } else {
                res.status(500).send(err);
            }
        } else {
            res.send({ message: `User with ID ${req.params.id} was deleted successfully!` });
        }
    });
};

module.exports = { 
    login, 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser 
};
