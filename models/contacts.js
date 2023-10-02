const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const updateContactsList = (contactsList) =>
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

const listContacts = async () => {
  try {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const contactById = async (id) => {
  try {
    const contactsList = await listContacts();
    const result = contactsList.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contactsList = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contactsList.push(newContact);
    await updateContactsList(contactsList);
    return newContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const removeContact = async (id) => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contactsList.splice(index, 1);
    await updateContactsList(contactsList);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const updateContact = async (id, { name, email, phone }) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contactsList[index] = {
    id,
    name,
    email,
    phone,
  };
  await updateContactsList(contactsList);
  return contactsList[index];
};

module.exports = {
  listContacts,
  contactById,
  removeContact,
  addContact,
  updateContact,
};
