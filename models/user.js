const {Schema, model} = require('mongoose');
const Joi = require('joi');

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
      },

}, {versionKey: false, timestamps: true});

const registerJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
users: registerJoiSchema,
login: registerJoiSchema
};

const User = model('user', userSchema);

module.exports = {
    User, 
    schemas
}