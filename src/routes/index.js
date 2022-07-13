const express = require("express");
const routes = express.Router();
                                                  ``
//Controllers
const taskController = require('../controllers/taskController')

//Routes
routes.get("/tasks", taskController.getAll);
routes.get("/task/:id", taskController.getOne);
routes.get("/tasks/completed", taskController.getCompleted)
routes.post("/task", taskController.create);
routes.put("/task/:id", taskController.update);
routes.delete("/task/:id", taskController.delete);
routes.put("/task/complete/:id", taskController.complete)

module.exports = routes;
