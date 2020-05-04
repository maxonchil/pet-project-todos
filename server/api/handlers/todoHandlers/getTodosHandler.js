const { Todo } = require('../../../schemas/todo.schema');
const errorHandler = require('../error.handler');
const success = require('../../utilits/successResponse');
const { SUCCESS_LOG } = require('../../../data/logs.json');

const getTodosHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Todo.find({})
    .then((todos) => res.json(success(SUCCESS_LOG.SENDED, { todos })))
    .catch((error) => errorHandler(error.message, res));
};
module.exports = getTodosHandler;
