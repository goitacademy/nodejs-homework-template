const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  verify: {
    type: Boolean,
    default: false, // Domyślnie użytkownik nie jest zweryfikowany
  },
  verificationToken: {
    type: String,
    default: null, // pole nie jest wymagane i domyślnie ma wartość null
  },
});

// Funkcja do hashowania hasła
userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

// Funkcja do sprawdzania poprawności hasła
userSchema.methods.validatePassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
