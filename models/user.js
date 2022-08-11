const Joi = require("joi");
const bcrypt = require("bcryptjs");
const {Schema, model} = require("mongoose");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      }
}, {versionKey: false, timestamps: true});

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const userJoiSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
  })
    
  const User = model("user", userSchema); 

  module.exports = {
    User,
    userJoiSchema
  }