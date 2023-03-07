const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

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

    avatarURL: String,
  },

  { versionKey: false }
);

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, 5);
};

user.methods.getValid = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = model("users", user);
module.exports = UserModel;
