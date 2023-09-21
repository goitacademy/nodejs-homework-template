const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is essential"],
    unique: true,
  
  },
  password: {
    type: String,
    required: [true, "Password is essential"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
