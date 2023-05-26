const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
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
  loginShema,
};

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
