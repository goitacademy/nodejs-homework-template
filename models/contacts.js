const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 2,
    },
    phone: {
      type: String,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      minLength: 2,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);
const Contact = model("contact", contactsSchema);

module.exports = Contact;
