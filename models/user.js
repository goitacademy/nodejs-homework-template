const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
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
    token: String,
  },
  { versionKey: false }
);

// Додаємо метод для хешування пароля перед збереженням користувача
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Додаємо метод для створення JWT токену
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, SECRET_KEY);
  this.token = token;
  return token;
};

const User = model("user", userSchema);

module.exports = User;
