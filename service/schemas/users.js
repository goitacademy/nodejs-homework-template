const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gravatar = require("gravatar");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is essential"],
    unique: true,
    avatarURL: String,
  },
  password: {
    type: String,
    required: [true, "Password is essential"],
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

userSchema.methods.generateAvatarUrl = function () {
  return gravatar.url(this.email, { s: "200", r: "pg", d: "identicon" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
