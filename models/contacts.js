const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match:
        /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/,
    },
    email: {
      type: String,
      match: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
    },
    phone: {
      type: String,
      required: true,
      match: /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model("contact", contactSchema);

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const addContact = async (contact) => {
  return Contact.create(contact);
};

const updateContact = async (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
