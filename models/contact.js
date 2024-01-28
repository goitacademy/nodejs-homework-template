
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
   
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
    ownerId: {
      type: String,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
