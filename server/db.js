const mongoose = require("mongoose");
const config = require("../config");
// const config = require("./config");

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
let cachedDB = null;
const connectDB = async () => {
  if (cachedDB) return cachedDB;
  const db = await mongoose
    .connect(config.MONGODB_URI, options)
    .catch((err) => {
      console.log({
        error: err.message,
      });
      setTimeout(() => {
        mongoose.connect(config.MONGODB_URI, options);
      }, 5000);
    });

  cachedDB = db;
  console.log(`mongodb connected: ${db.connection.host}`);
  return db;
};

module.exports = connectDB;
