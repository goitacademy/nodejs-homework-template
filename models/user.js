import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";
import { emailRegexp } from '../constans/userConstans.js';

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
}, { versionKey: false, timestamps: true });

userSchema.pre('findOneAndUpdate', handleUpdateValidate);
userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
