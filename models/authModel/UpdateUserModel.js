const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegExp,
    },
    passwordHash: {
      type: String,
      minLengtht: 8,
    },
  },
  { versionKey: false, timestamps: true }
);

const UpdateUserModel = mongoose.model("user", userSchema);

module.exports = UpdateUserModel;
