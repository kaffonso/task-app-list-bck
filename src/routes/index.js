const express = require("express");
const routes = express.Router();

const taskController = require('../controllers/taskController')

routes.get("/tasks", taskController.getAll);
routes.get("/task/:id", taskController.getOne);
routes.post("/task", taskController.create);
routes.put("/task/:id", taskController.update);
routes.delete("/task/:id", taskController.delete);
routes.put("/task/complete/:id", taskController.complete)

module.exports = routes;
