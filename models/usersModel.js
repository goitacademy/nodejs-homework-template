const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const user = new Schema(
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
    token: String,
  },
  {
    versionKey: false,
  }
);

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
user.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const verifyUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "business", "pro"),
});

const User = mongoose.model("users", user);

module.exports = { User, verifyUserSubscriptionSchema };
