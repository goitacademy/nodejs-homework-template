const { model, Schema } = require("mongoose");
const { genSalt, hash, compare } = require("bcrypt");
const userShema = new Schema({
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
});
userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.passwordHash = await hash(this.password, salt);
  next();
});

userShema.methods.checkPassword = (candidate, passwordHash) =>
  compare(candidate, passwordHash);
const User = model("User", userShema);

module.exports = User;
