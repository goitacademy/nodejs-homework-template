const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const contactsPath = path.resolve(__dirname, "../models/contacts.json");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);
    const contactsAfterRemove = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemove, null, 2)
    );
    return removedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    await contactSchema.validateAsync(body);

    const contacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    if (!Object.keys(body).length) {
      throw new Error("No fields to update");
    }

    await contactSchema.validateAsync(body);

    const contacts = await listContacts();
    const updatedContactIndex = contacts.findIndex(
      (contact) => contact.id.toLowerCase() === contactId.toLowerCase()
    );
    const updatingContact = contacts[updatedContactIndex];

    if (body.name) updatingContact.name = body.name;
    if (body.email) updatingContact.email = body.email;
    if (body.phone) updatingContact.phone = body.phone;

    contacts[updatedContactIndex] = updatingContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatingContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
