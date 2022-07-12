const express = require("express");
const routes = express.Router();

const taskController = require('../controllers/taskController')

routes.get("/", taskController.getAll);
routes.post("/", taskController.create);

module.exports = routes;
