const {Schema, model} = require ('mongoose');
const {handleMongooseError} = require('../helpers/handleMongooseError')
// const Joi = require('joi');
const {emailRegexp, subscriptionType} = require('../constans/users')

const userSchema = new Schema({
    password: {
        minlength:6,
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        match:emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: subscriptionType,
        default: "starter"
      },
      avatarURL:{
        type:  String,
        required: true,
      },
      token: {
        type: String,
      }
},{versionKey:false,})


userSchema.post("save",handleMongooseError);
const User = model("user", userSchema);
module.exports = User;