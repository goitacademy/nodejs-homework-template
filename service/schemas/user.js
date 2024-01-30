const mongoose = require("mongoose");
const handleMongooseError = require("../../utils/handleMongooseError");
const Schema = mongoose.Schema;

const emailRegexp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
const subscriptionsList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionsList,
      default: "starter",
    },
    token: {
      type: String,
      required: true,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = mongoose.model("User", userSchema);

module.exports = User;
