import {  Schema, model } from "mongoose";
import { handleMongooseError, runValidateAtUpdate } from "./hook.js";

import Joi from "joi";

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const  userSchema = new Schema({
    username:{
        type: String,
        required: true},

        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            match: emailRegexp,

          },
          password: {
            type: String,
            minlength:6,
            required:[true, 'Set password for user'],
    },
          accessToken: { type: String,},
          refreshToken: {type: String,}

  }, { versionKey: false, timestamps: true})


userSchema.post("save", handleMongooseError );
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model( "user", userSchema)


export default User