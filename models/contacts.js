const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.log('Contacts:', contacts);
    return contacts;
  } catch (error) {
    console.error(error.massage);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find((c) => c.id === contactId);
    if (!removedContact) {
      console.warn("Contact not found");
      return null;
    }
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );
    return removedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuid(),
      ...body,
    };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);
    if (!index) {
      console.warn("Contact not found");
      return null;
    }
    contacts[index] = { id: contactId, ...body };
    // const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return contacts[index];
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactSchema,
};
