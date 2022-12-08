const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authShema = mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

authShema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", authShema);
module.exports = { User };
