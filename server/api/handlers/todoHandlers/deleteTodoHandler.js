const { Todo } = require('../../../schemas/todo.schema');
const errorHandler = require('../error.handler');
const success = require('../../utilits/successResponse');
const { SUCCESS_LOG } = require('../../../data/logs.json');

const deleteTodoHandler = async (req, res) => {
  const deleteID = req.params.id;

  try {
    await Todo.findByIdAndRemove(deleteID);
  } catch (error) {
    return errorHandler(error.message, res);
  }

  Todo.find({})
    .then((todos) => {
      {
        res.json(success(SUCCESS_LOG.DELETED, { todos }));
      }
    })
    .catch((error) => errorHandler(error.message, res));
};

module.exports = deleteTodoHandler;
