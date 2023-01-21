const mongoose = require("mongoose");

const schema = mongoose.Schema({
  password: {
    type: String,
    unique: true,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  contacts: {
    type: [mongoose.Types.ObjectId],
    rel: "contact",
  },
});

const User = mongoose.model("users", schema);

module.exports = {
  User,
};
