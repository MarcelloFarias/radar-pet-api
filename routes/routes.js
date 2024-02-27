const express = require("express");
const app = express();

const userController = require("../controllers/userController");
const petController = require("../controllers/petController");

//user routes
app.post("/users", userController.create);
app.post("/users/auth", userController.authenticate);
app.get("/users", userController.getAll);
app.get("/users/:id", userController.getById);
app.delete("/users/:id", userController.delete);
app.put("users/:id", userController.update);

//pet routes
app.post("/pets", petController.create);
app.get("/pets", petController.getAll);
app.get("/pets/:id", petController.getById);
app.delete("/pets/:id", petController.delete);
app.put("/pets/:id", petController.update);

module.exports = app;