const { Schema, model, Types } = require("mongoose");

const schema = Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  contacts: {
    type: [Types.ObjectId],
    ref: "contacts",
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

const User = model("user", schema);

module.exports = User;
