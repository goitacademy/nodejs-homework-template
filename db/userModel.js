const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const contactSchema = new mongoose.Schema({
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
  avatarURL: {
    type: String,
    default: gravatar.url(this.email),
  },
  verify: {
    type: Boolean,
    default: false,
  },
  // verificationToken: {
  //   type: String,
  //   required: [true, "Verify token is required"],
  // },
});
contactSchema.pre("save", async function () {
  if (this.isNew) {
  }
  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", contactSchema);
module.exports = {
  User,
};
