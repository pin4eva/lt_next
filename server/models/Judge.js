const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JudgeSchema = new Schema({
  name: String,
  image: String,
  bio: String,
  state: String,
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.module("Judge", JudgeSchema);
