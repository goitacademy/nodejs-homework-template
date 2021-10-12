const { Shema, model } = require("mongoose");
const Joi = require("joi");

const userShema = Shema({
  password: {
    type: String,
    required: [true, "Password is required"],
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
  token: {
    type: String,
    default: null,
  },
});

const JoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required().default(starter),
  token: Joi.string().default(null),
});

const User = model("user", userShema);

model.exports = {
  User,
  JoiSchema,
};
