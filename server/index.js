const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const todosRouter = require('./api/routing/todos.router');
const log4js = require('log4js');
const logger = log4js.getLogger();
const dbConnection = require('./api/utilits/dbConnection');
const { ERROR_LOG } = require('./data/logs.json');
const { level } = config.get('logger');
const path = require('path');

app.use(express.static(__dirname + '/dist/FE'));

const { port: serverPort } = config.get('webServer');

logger.level = level;

const dbConnect = dbConnection();
if (!dbConnect) {
  return logger.error(ERROR_LOG.DB_CONNECTION);
}

app.use(express.json());
app.use(cors());

app.use('/api/todos', todosRouter);

app.listen(serverPort, () =>
  console.log(`Server started at port ${serverPort}`)
);
