import { Schema, model } from "mongoose";

import { handleSaveError, validateAtUpdate } from "./hooks.js";

import { emailRegexp } from "../constans/user-constans.js";

const userShema = new Schema({
    name {
    type: String,
    required: true
},
    email {
    type: String,
    math: emailRegexp,
    unique: true,
    required: true
},
    password {
    type: String,
    minlenth: 6,
    required: true
},
}, { versionKey: false, timestamps: true });
