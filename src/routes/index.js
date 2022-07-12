const express = require("express");
const routes = express.Router();

const taskController = require('../controllers/taskController')

routes.get("/tasks", taskController.getAll);
routes.get("/tasks/:id", taskController.getOne);
routes.post("/tasks", taskController.create);
routes.delete("/tasks/:id", taskController.delete);


module.exports = routes;
