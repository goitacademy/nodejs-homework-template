const { model, Shema } = require("mongoose");

const userShema = new Shema({
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

const User = model("User", userShema);

module.exports = User;
