const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseError } = require("../helpers");

const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", mongooseError);

const registrationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(7).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(7).required(),
});

const schemas = {
  registrationSchema,
  loginSchema,
};

const User = model("user", userShema);

module.exports = { User, schemas };

// userShema.methods.setPassword = function (password) {
//     this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }
