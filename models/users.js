const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleSaveErrors = (error, _, next) => {
	const { name, code } = error;
	if (name === "MongoServerError" && code === 11000) {
		error.status = 409;
	} else {
		error.status = 400;
	}

	next();
};

const userSchema = new Schema({
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
      token: {
        type: String,
        default: null,
      },

}, {versionKey: false, timestamps:true})

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
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