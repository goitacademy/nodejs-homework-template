const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getId = contacts.find((el) => el.id === String(contactId));

    if (!getId) {
      return null;
    }
    return getId;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((el) => el.id === String(contactId));
    if (idx === -1) {
      return null;
    }
    const spliceIdx = contacts.splice(idx, 1);
    return spliceIdx;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContacts = { ...body, id: uuidv4() };
    console.log(newContacts);
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((el) => el.id === String(contactId));
    if (idx === -1) {
      return null;
    }

    contacts[idx] = { ...body, contactId };
    await fs.writeFile(contactsPath, JSON.stringify(contactsPath, null, 4));
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
getContactById(2);
