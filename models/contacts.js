// const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = await import("nanoid");
const Contact = require("./Contact");

const contactsPath = path.join(__dirname, "./contacts.json");

// const readContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf8");
//   return JSON.parse(data);
// };

// const writeContacts = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const addContact = async ({ name, email, phone }) => {
  const newContact = new Contact({ name, email, phone });
  return await newContact.save();
};

const updateContact = async (contactId, { name, email, phone }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
