const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
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
  },

  { versionKey: false, timestamps: true }
);

const joiSignupSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valueOf("starter", "pro", "business"),
  token:Joi.string(),
});

// const joiLoginSchema = Joi.object({
//   password: Joi.string().min(7).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
// });


const User = model("user", userSchema);


module.exports = {joiSignupSchema, User};