const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
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

schema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

schema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("users", schema);

module.exports = UserModel;
