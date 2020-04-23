const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
  email_confirmation_token: String,
  isActive: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
