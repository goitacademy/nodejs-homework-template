const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");
const Joi = require("joi");

const user = new Schema(
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
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contacts",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const userSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .regex("^[a-zA-Z0-9]{6,30}$")
    .required()
    .error(new Error("The password must contain a minimum of 6 characters")),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

user.methods.setPass = function (password) {
  this.pass = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};
user.methods.isSamePass = function (password) {
  return bCrypt.compareSync(password, this.password);
};
user.methods.setPass = function (pass) {
  this.password = bCrypt.hashSync(pass, bCrypt.genSaltSync(6));
};

user.methods.setToken = function (token) {
  this.token = token;
};
const User = model("user", userSchema);

module.exports = { User, userSchema };
