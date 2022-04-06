const { Schema, model } = require('mongoose');
const Joi = require('joi'); 

const userSchema = Schema ({
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
  },
});

const joiUserSchema = Joi.object({
    password: Joi.string().required().message({
        'any.required': 'missing required password field'
    }),
    email: Joi.string().required().message({
        'any.required': 'missing required email field'
    }),
    subscription: Joi.string(),
    token: Joi.string(),
})

const User = model('user', userSchema);

module.exports = {
    User,
    joiUserSchema,
}