const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contacts = new Schema(
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
  }, 
  { versionKey: false }
);

const Contacts = mongoose.model("contacts", contacts);

const listContacts = async () => {
  return Contacts.find();
};

const getContactById = async (id) => {
  return Contacts.findOne({ _id: id });
};

const removeContact = async (id) => {
  const result = await getContactById(id)
  console.log(result)
  if(result) {
    return Contacts.findByIdAndRemove({ _id: id })
  } else { 
    return null
  }
};

const addContact = async (body) => {
  return Contacts.create(body);
};

const updateContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const patchContact = async (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
};
