const { Schema, model, SchemaTypes } = require("mongoose");
const { errorValidation } = require("../middleware");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: [3, "name is too short"],
      unique: true,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "fill a valid email address",
      ],
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      match: /^[+]?[0-9 ()-]*$/,
      required: [true, "phone number is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", errorValidation);

const Contact = model("contact", contactSchema);

module.exports = Contact;
