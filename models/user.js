const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//--------------------joijoijoijoijoijoijoijoi
const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email.required(),
  password: Joi.string().required(),
});

const schemas = { registerSchema };

module.exports = {
  schemas,
};

module.exports = mongoose.model("User", userSchema);
