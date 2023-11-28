const check = require("validator");
const { Schema } = require("mongoose");

const mongooseContactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => check.isEmail(value),
        message: "Email has wrong format",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongooseContactSchema;
