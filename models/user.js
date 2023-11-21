const { Schema, model } = require("mongoose");
const Joi = require("joi");

const MongooseError = require("../helpers/MongoosError");

const SUBLIST = ["starter", "pro", "business"];
const EMAILREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: EMAILREGEX,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: SUBLIST,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const authSchema = Joi.object({
  email: Joi.string().pattern(EMAILREGEX).required(),
  password: Joi.string().min(6).required(),
}).messages({ "any.required": "missing required {#key} field" });

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...SUBLIST)
    .required(),
});

const schema = {
  authSchema,
  subscriptionSchema,
};

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = { User, schema };
