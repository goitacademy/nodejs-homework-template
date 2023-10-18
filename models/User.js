import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        minlength: 6,
        required: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
    token: {
        type: String, 
    }
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveError)

const User = model("user", userSchema) 

export default User