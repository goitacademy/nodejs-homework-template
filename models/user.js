const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (email) => {
   
        return validator.isEmail(email);
      },
      message: "Invalid email format",
    },
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
  },
});

const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
    avatarURL: Joi.string(),
  });

  return schema.validate(user);
};

module.exports = { User, hashPassword, validateUser };
