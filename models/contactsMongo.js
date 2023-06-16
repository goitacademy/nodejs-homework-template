const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "Name must have at least 2 characters"],
      maxlength: [70, "Name can have at most 70 characters"],
      required: [true, "Name is required"]
    },
    email: {
        type: String,
        minlength: [3, "Email must have at least 3 characters"],
        maxlength: [170, "Email can have at most 170 characters"],
        required: [true, "Email is required"],
        validate: {
            validator: function (value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value);
            },
            message: "Email must be a valid email address"
          }
    },
    phone: {
        type: String,
        minlength: [9, "Phone must have at least 9 characters"],
        maxlength: [10, "Phone can have at most 10 characters"],
        required: [true, "Phone is required"],
        validate: {
            validator: function (value) {
              const phoneRegex = /^\d{9,15}$/;
              return phoneRegex.test(value);
            },
            message: "Phone number must be a valid number with 9-15 digits"
          }
    },
    favorite: {
      type: Boolean,
      default: false,
      required: [true, "Favorite is required"],
    }
  }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
