const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,

    maxlength: 30,
    required: [true, "Set name for contact"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
    unique: true,
  },
  phone: {
    type: String,
    maxlength: 18,
    required: [true, "Set phone for contact"],
    unique: true,
    // validate: {
    //   validator: function (v) {
    //     return /\(\d{3}\)\s\d{3}-\d{4}/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const ContactMod = model("contact", contactSchema);

module.exports = ContactMod;
