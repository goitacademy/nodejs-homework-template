const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: false,
  },
  email: {
    type: String,
    unique: false,
  },
  phone: {
    type: String,
    unique: false,
  },
  favorite: {
    type: Boolean,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Contacts = mongoose.model("contacts", contactSchema);

module.exports = Contacts;
