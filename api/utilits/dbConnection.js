const mongoose = require("mongoose");
const config = require("config");
const { url } = config.get("dataBase");
const log4js = require("log4js");
const logger = log4js.getLogger();
const { SUCCESS_LOG } = require("../../data/logs.json");

const connectDB = async () => {
  try {
    const result = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(SUCCESS_LOG.DB_CONNECTION);
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = connectDB;
