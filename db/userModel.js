const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userSchema } = require("./schema");

userSchema.setToken = function (token) {
  this.token = token;
  return this;
};

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("users", userSchema);

module.exports = { User };
