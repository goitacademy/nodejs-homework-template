const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required,
  email: Joi.string().required,
  password: Joi.string().required(),
});
const loginSchema = Joi.object({
  name: Joi.string().required,
  email: Joi.string().required,
  password: Joi.string().required(),
});

const schema = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);
module.exports = {
  User,
  schema,
};
