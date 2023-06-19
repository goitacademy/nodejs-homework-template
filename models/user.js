const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const subscriptionType = ["starter", "pro", "business"];

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionType,
    default: "starter",
  },
  token: String,
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };
