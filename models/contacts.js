// // const fs = require('fs/promises')
// const fs = require("fs").promises;
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
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
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

// const contactsPath = path.join(__dirname, "./contacts.json");

// const parsedData = async () => {
//   try {
//     const data = await fs.readFile(contactsPath, "utf-8");
//     const contacts = JSON.parse(data);
//     return contacts;
//   } catch (error) {
//     console.log(error);
//   }
// };

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const oneContact = await Contact.findById(contactId);
  return oneContact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return contact;
};

const updateContactFavorite = async (contactId) => {
  const contact = await Contact.findByIdAndUpdate(contactId);
  if (!contact) {
    return null;
  }
  if (contact.favorite !== undefined) {
    const updateFavorite = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: !contact.favorite },
      { new: true }
    );
    return updateFavorite;
  } else {
    console.log("missing field favorite");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
};
