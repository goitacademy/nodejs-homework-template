import mongoose from "mongoose";
import Joi from "joi";
import handleSaveError from './hooks.js'


const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
        type: String,
      required: [false]
    },
    password: {
      type: String,
      required: [true, "Set password for the user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  });

    userSchema.post("save", handleSaveError);

  export const userSignUpSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  export const userSigninSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const User = mongoose.model('User', userSchema);

  export default User;


  
