const { Schema, model } = require("mongoose");
const Joi = require("joi");
const MongooseError = require("../../Helpers/MongooseError");

const emailSchema = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailSchema,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarUrl: String,
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", MongooseError);

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(emailSchema)
        .required(),
    password: Joi.string().min(6)
        .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailSchema).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
  schemas  
};


