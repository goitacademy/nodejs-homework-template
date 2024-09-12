const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Set password for use"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            enique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: "",
        },
    },
    { versionKey: false, timestams: true }
);

const registerShema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    subscription: Joi.string()
        .valid("starter", "pro", "business")
        .default("starter"),
});

const loginShema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

const schemas = {
    registerShema,
    loginShema
};

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};











