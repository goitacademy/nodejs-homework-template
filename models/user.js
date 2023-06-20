const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
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
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerValidator = (data)=>{
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const loginValidator = (data)=>{
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

module.exports = {
  User,
  registerValidator,
  loginValidator
};
