import { model, Schema } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate} from "./hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
    },
    avatarUrl: {
        type: String,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required']
    }
}, { versionKey: false, timestamps: true });


userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);


export const userSignSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

export const userUpdateSubscriotion = Joi.object({
    subscription: Joi.string().required().valid(...subscriptionList)
})

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})
const User = model("user", userSchema);

export default User;