const {Schema, model} = require('mongoose');
const Joi = require('joi');
const bcrypt = require("bcryptjs");

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
        default: null
      },
      avatarURL: {
        type: String,
        require: true
      },
}, {versionKey: false, timestamps: true});

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(), 
  subscription: Joi.string(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};