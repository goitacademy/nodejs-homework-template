const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([[\].-]?\w+)*@\w+([[\].-]?\w+)*(\.\w{2,3})+$/;

const passwordList = [true, "Set password for user"];
const emailList = [true, "Email is required"];
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: passwordList,
      minlength: 6,
    },
    email: {
      type: String,
      required: emailList,
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
