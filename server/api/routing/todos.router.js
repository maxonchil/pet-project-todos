const express = require("express");
const router = express.Router();
const getTodosHandler = require("../handlers/todoHandlers/getTodosHandler");
const deleteTodoHandler = require("../handlers/todoHandlers/deleteTodoHandler");
const addTodoHandler = require("../handlers/todoHandlers/addTodoHandler");
const updateTodoHandler = require("../handlers//todoHandlers/updateTodoHandler");

router.get("/getAll", getTodosHandler);

router.delete("/delete:id", deleteTodoHandler);

router.post("/add", addTodoHandler);

router.put("/update:id", updateTodoHandler);

module.exports = router;
