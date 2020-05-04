const mongoose = require("mongoose");
const config = require("config");
const { url } = config.get("dataBase");

const connectDB = async () => {
  try {
    return await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return null;
  }
};

module.exports = connectDB;
