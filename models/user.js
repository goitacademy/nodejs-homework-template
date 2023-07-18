import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError, patterns } from "../helpers";

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "Define name"],
  },
  email: {
    type: String,
    required: true,
    match: patterns.email,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:24,
    },
    token: {
        type: String,
        default: "",
    }
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const signup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().math(patterns.email).required(),
    password: Joi.string().min(6).max(24).required(),
})

const signin = Joi.object({
  email: Joi.string().math(patterns.email).required(),
  password: Joi.string().min(6).max(24).required(),
});

const schemas = {
    signup,
    signin,
}

export {
    schemas,
    User,
} 

