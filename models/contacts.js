const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(process.cwd(), "/models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = await JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error.mesagge);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    console.log(contactId);
    const results = contacts.filter(({ id }) => id === contactId);

    return results;
  } catch (error) {
    console.log(error.mesagge);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.filter(({ id }) => id !== contactId))
    );

    return contacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(error.mesagge);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = { id: uuidv4(), name: name, email: email, phone: phone };
    const contacts = await listContacts();
    await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
    return newContact;
  } catch (error) {
    console.log(error.mesagge);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
