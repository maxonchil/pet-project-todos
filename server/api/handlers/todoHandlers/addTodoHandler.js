const { Todo, todoValidationSchema } = require('../../../schemas/todo.schema');
const errorHandler = require('../error.handler');
const success = require('../../utilits/successResponse');
const { SUCCESS_LOG, ERROR_LOG } = require('../../../data/logs.json');

const addTodoHandler = (req, res) => {
  const { todo } = req.body;

  const { value: ValidatedTodo, error } = todoValidationSchema.validate(todo);

  if (error) {
    return errorHandler(ERROR_LOG.VALIDATION, res);
  }

  const newTodo = new Todo(ValidatedTodo);

  newTodo
    .save()
    .then((todo) => res.json(success(SUCCESS_LOG.ADDED, { todo })))
    .catch((error) => errorHandler(error.message, res));
};
module.exports = addTodoHandler;
