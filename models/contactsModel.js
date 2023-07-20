const { model, Schema } = require("mongoose");

const contactRolesEnum = require("../constans/contactRolesEnum");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Dublicated email.."],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: String,

    role: {
      type: String,
      enum: Object.values(contactRolesEnum),
      default: contactRolesEnum.USER,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
