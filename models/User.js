import { Schema, model } from "mongoose";

const usersShema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password from user']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter'
    },
    avatarURL: String,
    token: String,
},
    { versionKey: false, timeseries: true }
);

export const User = model('user', usersShema);