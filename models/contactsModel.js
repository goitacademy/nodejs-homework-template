const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const contacts = new Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
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
  },
  {
    versionKey: false,
  }
);

const Contact = mongoose.model("contacts", contacts);

module.exports = Contact;
