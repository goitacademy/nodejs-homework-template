const fs = require("fs").promises;
const path = require("path");
const nodeid = require("node-id");

const contactsPath = path.join(__dirname, "../models/contacts.json");

async function getParsedData() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function listContacts() {
  try {
    const contacts = await getParsedData();
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getParsedData();
    const getContact = contacts.find((item) => item.id === contactId);
    return getContact;
  } catch (error) {
    console.log(error);
  }
}
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const findIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (findIndex === -1) {
      return null;
    }
    const [deleteContact] = contacts.splice(findIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deleteContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await getParsedData();
    const addNewContact = {
      id: nodeid(),
      name,
      email,
      phone,
    };
    contacts.push(addNewContact);
    const stringifiedContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifiedContacts, "utf8");
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const findIndex = contacts.findIndex((contact) => contact.id === id);

  if (findIndex === -1) {
    return null;
  }

  contacts[findIndex] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[findIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
