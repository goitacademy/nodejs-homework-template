const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
