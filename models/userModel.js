const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userShema = mongoose.Schema({
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
});

userShema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  // check if is not new
});

const User = mongoose.model("User", userShema);

module.exports = {
  User,
};
