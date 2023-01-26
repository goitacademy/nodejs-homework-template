const { Schema, model } = require("mongoose");

const Joi = require("joi");

const userSchema = new Schema({

    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        // match: emailRegexp,
        unique: true,
    },
    
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
     avatarURL: {
    type: String,
     },
    token: {
        type: String,
        default: null,
    },
    
},
    {
        versionKey: false,
        timestamps: true
    });

const User = model("user", userSchema);

  const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  });

  const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

  module.exports = {
 registerSchema,
      User,
  loginSchema
};


