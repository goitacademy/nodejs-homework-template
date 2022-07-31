import { timeStamp } from "console";
import { model, Schema } from "mongoose";
import { userSubscription } from "./userSubscription";

const UserSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    subscription: {
        type: String,
        enum: [...userSubscription],
        default: 'starter',
    },
    token: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false,
}
);

const modelUser = model('user', UserSchema);

export default modelUser;