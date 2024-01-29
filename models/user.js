const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
};

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: patterns.email,
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
       token: {
            type: String,
            default: ""
        },
    }
);


userSchema.post("save", handleMongooseError);


const joiUserSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().min(8).required(),
});

const schemas = {
    joiUserSchema,
     
};

const User = model("user", userSchema);

module.exports = { User, schemas };