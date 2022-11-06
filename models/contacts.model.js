const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const User = model("contact", userSchema);

module.exports = {
  User,
};
