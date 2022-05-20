const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt")


const user = new Schema({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

user.methods.setPassword = async function (password) {
    this.password = await bcrypt.hash(password, bcrypt.genSaltSync(6))
}

const User = mongoose.model("users", user)

module.exports = User;