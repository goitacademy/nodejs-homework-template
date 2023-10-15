const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "First name has to be present."],
      index: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("contacts", userSchema);

module.exports = {
  User,
};
