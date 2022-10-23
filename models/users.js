const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usersSchema = new Schema(
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
    token: { type: String, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

usersSchema.post("save", (error, data, next) => {
  const { name, code } = error;

  if (name === "ValidationError") {
    error.status = 400;
  }
  next();
});

const registerSchemas = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.number().integer().min(4).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginSchemas = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.number().integer().min(4).required(),
});

const subscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  registerSchemas,
  loginSchemas,
  subscription,
};

const User = model("user", usersSchema);

module.exports = { User, schemas };
