
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   minlength: 24,
    //   maxlength: 24,
    //   required: [true, 'Set id for searching contact'],
    // },
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String, unique: true 
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
