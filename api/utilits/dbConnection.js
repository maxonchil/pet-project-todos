const mongoose = require('mongoose');
const config = require('config');
const { username, password, dbName, cluster } = config.get('dataBase');
const log4js = require('log4js');
const logger = log4js.getLogger();
const { SUCCESS_LOG } = require('../../data/logs.json');

const connectDB = async () => {
  const CONNECT_URL = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  try {
    return await mongoose.connect(CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logget.info(SUCCESS_LOG.DB_CONNECTION);
    return connectResult;
  } catch (error) {
    return null;
  }
};

module.exports = connectDB;
