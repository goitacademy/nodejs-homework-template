const fs = require("fs/promises");
// const { v4: uuidv4 } = require("uuid");
const Contact = require("../models/contact.model");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await Contact.findById(contactId);
  return contacts;
};

const removeContact = async (contactId) => {
  const contact = await Contact.deleteOne({ _id: contactId });
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contactNew = await Contact.create({ name, email, phone });
  return contactNew;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId, ...body }); // не працює !!!
  // const contacts = await listContacts();
  // const index = contacts.find((contact) => contact.id === contactId);
  // if (!index) {
  //   return null;
  // }
  // contacts[index] = { id: contactId, ...body };
  // await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
  return { _id: contactId, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
