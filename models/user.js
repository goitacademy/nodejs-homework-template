const { Schema, model } = require("mongoose");
const Joi = require("joi");
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
      maxlength: 15,
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
    // token: String,
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "users",
    // },
  },
  { versionKey: false, timestamps: true }
);
const joiRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
const statusJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const User = model("user", userSchema);
module.exports = { User, joiRegisterSchema, joiLoginSchema };
