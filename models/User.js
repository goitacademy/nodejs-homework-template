const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { emailRegex } = require("../config/constants");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
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
  { versionKey: false, timestamps: true }
);

//Cоздание с помощью схемы - sync
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Cоздание с помощью схемы - async
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compareSync(password, this.password);
// };

const joiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  subscription: Joi.string(),
  token: Joi.string(),
});

const User = model("user", userSchema);
module.exports = { User, joiUserSchema };
