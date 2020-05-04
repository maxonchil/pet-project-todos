const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const Todo = new Schema({
  title: String,
  completed: Boolean,
  date: String,
  time: String,
  priority: String,
});

const todoValidationSchema = Joi.object({
  title: Joi.string().min(2).required(),
  completed: Joi.boolean().required(),
  date: Joi.string().min(6).required(),
  time: Joi.string().required(),
  priority: Joi.string().required(),
});

module.exports = { Todo: mongoose.model('Todo', Todo), todoValidationSchema };
