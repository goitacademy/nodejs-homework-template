const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const userSchema = new Schema ({
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
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        token: String,
        avatarUrl: {
            type: String,
            required: true,
        }

}, {versionKey: false, timestamps: true})

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}