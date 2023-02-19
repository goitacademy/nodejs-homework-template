const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const getContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    const contacts = await getContacts();

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();

    const [contactById] = contacts.filter(({ id }) => id === contactId);

    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await getContacts();

    await fs.writeFile(contactsPath, JSON.stringify([body, ...contacts])),
      { encoding: "utf8" };
    return body;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();

    const [contactById] = contacts.filter(({ id }) => id !== contactId);

    if (!contactById) {
      return { error: "Contact not found" };
    }

    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

listContacts();
