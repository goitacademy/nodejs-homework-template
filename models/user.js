const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const userRolesEnum = require("../constants/userRoleEnum");


const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.STARTER,
    },

    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  // email: Joi.string().email().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});


const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});



const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
