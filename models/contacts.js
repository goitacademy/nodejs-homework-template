const { Schema, model, SchemaTypes } = require("mongoose");

const contact = new Schema(
  {
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false }
);

const ContactsModel = model("contact", contact);
module.exports = ContactsModel;
