const mongoose = require("mongoose");
// const Joi = require("joi");

// const patterns = {
//   email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//   password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
// };

// const newUserSchema = Joi.object({
//   email: Joi.string().pattern(patterns.email).required(),
//   password: Joi.string().pattern(patterns.password).required(),
// });

const userSchema = new mongoose.Schema({
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
  token: String,
});

module.exports = mongoose.model("User", userSchema);
