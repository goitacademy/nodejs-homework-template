const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const contactsShema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Set name for contact"],
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });
const contactShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
  //   crearesAt: { type: Date, defualt: Date.now() },
});
const Contact = mongoose.model("Contact", contactShema);
// const err = Contact.validateSync();

// err instanceof mongoose.Error.ValidationError;
module.exports = { Contact };
