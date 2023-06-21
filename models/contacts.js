const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);
const Contact = model("contact", contactsSchema);

module.exports = Contact;
