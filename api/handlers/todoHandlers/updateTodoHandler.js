const { Todo } = require('../../../schemas/todo.schema');
const errorHandler = require('../error.handler');
const success = require('../../utilits/successResponse');
const { SUCCESS_LOG } = require('../../../data/logs.json');

const updateTodoHandler = (req, res) => {
  const { title, completed } = req.body;
  const { id: todoID } = req.params;

  Todo.findByIdAndUpdate(todoID, { title, completed }, { new: true })
    .then((todo) => res.json(success(SUCCESS_LOG.UPDATED, { todo })))
    .catch((error) => errorHandler(error.message, res));
};

module.exports = updateTodoHandler;
