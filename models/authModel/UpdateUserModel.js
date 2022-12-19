const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

const updateUserSchema = new Schema(
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
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const UpdateUserModel = mongoose.model("user", updateUserSchema);

module.exports = UpdateUserModel;
