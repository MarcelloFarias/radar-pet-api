const express = require("express");
const app = express();

const userController = require("../controllers/userController");
const petController = require("../controllers/petController");
const verifyToken = require("../middlewares/auth");

//user routes
app.post("/users/auth", userController.authenticate);
app.get("/users/auth", verifyToken, userController.authorize);
app.post("/users", userController.create);
app.get("/users", userController.getAll);
app.get("/users/:id", userController.getById);
app.delete("/users/:id", userController.delete);
app.put("/users/:id", userController.update);
app.put("/updatePassword/:id", userController.updatePassword);

//pet routes
app.post("/pets", petController.create);
app.get("/pets", petController.getAll);
app.get("/", petController.getPaged);
app.get("/pets/search/:name", petController.getByName);
app.get("/pets/:id", petController.getById);
app.delete("/pets/:id", petController.delete);
app.put("/pets/:id", petController.update);

module.exports = app;
