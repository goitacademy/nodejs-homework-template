const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
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
    avaUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.methods.setPassword = (password) => {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().min(8).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
};
