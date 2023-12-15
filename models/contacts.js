const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(allContacts);
    return parsedContacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactIndex = allContacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) return null;

    const [deletedContact] = allContacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: uuid.v4(),
      ...body,
    };

    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const contactIndex = allContacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) return null;

    allContacts[contactIndex] = {
      id: contactId,
      ...body,
    };

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return allContacts[contactIndex];
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