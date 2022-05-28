const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (id) => {
  try {
    const data = await listContacts();
    return data.filter((contact) => contact.id === id);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (id) => {
  try {
    const sourceContacts = await listContacts();
    const newContacts = sourceContacts.filter(
      (contact) => contact.id !== String(id)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return sourceContacts.filter((contact) => contact.id === id);
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const id = await uuidv4();

    const newContact = {
      id,
      name,
      email,
      phone,
    };

    const sourceContacts = await listContacts();
    const newContacts = [...sourceContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (id, body) => {
  try {
    const sourceContacts = await listContacts();
    let contactToUpdate = sourceContacts.filter((contact) => contact.id === id);
    contactToUpdate = { id, ...body };

    const сontactsForUpdate = sourceContacts.filter(
      (contact) => contact.id !== String(id)
    );

    const newContacts = [...сontactsForUpdate, contactToUpdate];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return contactToUpdate;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
