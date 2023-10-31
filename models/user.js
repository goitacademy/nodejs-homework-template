import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const emailRegexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema(
    {
        password: {
            type: String,
            minlength: 6,
            required: [true, "Set password for user"],
        },
        email: {
            type: String,
            match: emailRegexp,
            unique: true,
            required: [true, "Email is required"],
        },
        subscription: {
            type: String,
            required: true,
            enum: subscriptionList,
            default: "starter",
        },
        token: {
            type: String,
            default: "",
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
};

const User = model("user", userSchema);

export { User, schemas };