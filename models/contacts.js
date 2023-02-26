
const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

async function getById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find(({ id }) => id === contactId);

    if (!contact) {
      return console.error(`Contact with ID ${contactId} not found!`);
    }
    return contact;
  } catch (error) {
    return console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const deletedContact = data.find(({ id }) => id !== contactId);
    const filteredContacts = data.filter(({ id }) => id !== contactId);

    if (!deletedContact) {
      return;
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf8"
    );
    return deletedContact;
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(newData) {
  try {
    const data = await listContacts();
    const newContact = {
      id: shortid(),
      ...newData,
    };

    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), "utf8");

    return newContact;
  } catch (error) {
    return console.error(error.message);
  }
}

async function updateContact(id, data) {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contact[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contact[index];
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
