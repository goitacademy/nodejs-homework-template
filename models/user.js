const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

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
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: { type: String, require: true },
  token: String,
});
userSchema.post("save", handleMongooseError);

const User = model("User", userSchema);

module.exports = User;
