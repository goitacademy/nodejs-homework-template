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
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getParsedData();
    const getContact = contacts.find((item) => item.id === contactId);

    if (!getContact) {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
async function removeContact(contactId) {
  try {
    const contacts = await getParsedData();
    const getFilteredContact = contacts.filter((item) => item.id !== contactId);
    const stringifiedContacts = JSON.stringify(getFilteredContact);
    await fs.writeFile(contactsPath, stringifiedContacts, "utf8");
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
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
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await getParsedData();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
