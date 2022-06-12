const { Schema, model } = require('mongoose');
const Joi = require('joi');


const userSchema = Schema(
    {
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
}, { versionKey: false, timestamps: true });

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
  subscription: Joi.string().min(3),
  token: Joi.string()
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()
})
const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().min(3).lowercase().valid("starter", "pro", "business").required()
})
// Можна добавити метод до схеми і при створенні new User викликати його
// userSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// }

const User = model('user', userSchema)

module.exports = { User, joiRegisterSchema, joiLoginSchema, joiSubscriptionSchema };