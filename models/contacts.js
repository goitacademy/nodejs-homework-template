const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(`Error:${err.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      console.log(`There is no contact with id=${contactId}`);
      return null;
    }
    return data[index];
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      console.log(`There is no contact with id=${contactId}`);
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const newContact = {
      id: uid(12),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactToUpdate = await getContactById(contactId);
  const updatedContact = { ...contactToUpdate, ...body };
  const index = contacts.findIndex(({ id }) => id === contactId);

  contacts.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
