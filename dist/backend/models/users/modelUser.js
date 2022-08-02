"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSubscription_1 = require("./userSubscription");
const UserSchema = new mongoose_1.Schema({
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
        enum: [...userSubscription_1.userSubscription],
        default: 'starter',
    },
    token: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false,
});
const modelUser = (0, mongoose_1.model)('user', UserSchema);
exports.default = modelUser;
