const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const usersSchema = new Schema(
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
  { versionKey: false, timestamps: true }
);

usersSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

usersSchema.methods.comparePass = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model("user", usersSchema);

module.exports = User;
