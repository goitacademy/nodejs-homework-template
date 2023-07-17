const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
      type : String,
    default: "",
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },

  {
    versionKey: false,
  }
);

userSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  if (status === 409) {
    error.message = "Email in use";
  }
  next();
});

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .error(new Error("missing required password field")),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("missing required email field")),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .error(new Error("missing required password field")),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("missing required email field")),
  subscription: Joi.string(),
});

const authSchemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, authSchemas };
