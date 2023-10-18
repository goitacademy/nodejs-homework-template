const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    enum: ["user", "superuser"],
    default: "user",
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre(`save`, async function () {
  if (!this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model("user", userSchema);

module.exports = {
  User,
};
