const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
  }
}, {versionKey: false, timestamps: true});


userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}


const Joi = require("joi");


const joiSchema = Joi.object({
    password: Joi.string().min(5).max(35).required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
    })


    const User = model("user", userSchema)

    module.exports = {
        User,
        joiSchema
    }