const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongoSwerverError } = require("../../utils");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
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
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatar = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=monsterid`;
  }
  next();
});

userSchema.post("save", mongoSwerverError);

const registerSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});

const mailSchema = Joi.object({
  email: Joi.string().required().email(),
});

const schemas = {
  registerSchema,
  loginSchema,
  mailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
