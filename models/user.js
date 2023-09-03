const { model, Schema } = require('mongoose');
const handleMongooseErr = require('../helpers/handleMongooseErr');
const Joi = require('joi');

const usersSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
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
        token: String
    },
    {
        versionKey: false, timestamps: true
    }
);

usersSchema.post("save", handleMongooseErr);
const User = model('user', usersSchema);

const JoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    
  });

module.exports ={ User, JoiSchema};