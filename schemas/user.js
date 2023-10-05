import { Schema, model } from "mongoose";
import { mongooseError } from "../helpers/mongooseError.js";

const userSchema = new Schema(
    {
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
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

export default model("user", userSchema);