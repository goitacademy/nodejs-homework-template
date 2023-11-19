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
    const allContacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(allContacts);

    const [singleContact] = parsedContacts.filter(({ id }) => id === contactId);
    return singleContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(allContacts);

    const updatedContacts = parsedContacts.filter(({ id }) => id !== contactId);
    const updatedContactsJson = JSON.stringify(updatedContacts, null, 2);

    await fs.writeFile(contactsPath, updatedContactsJson, "utf-8");
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = {
      id: uuid.v4(),
      name,
      email,
      phone,
    };

    const allContacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(allContacts);

    parsedContacts.push(newContact);
    const updatedContacts = JSON.stringify(parsedContacts, null, 2);

    await fs.writeFile(contactsPath, updatedContacts);

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const allContacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(allContacts);

    const contactIndex = parsedContacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) return;

    parsedContacts[contactIndex].name = name;
    parsedContacts[contactIndex].email = email;
    parsedContacts[contactIndex].phone = phone;

    const finalContactsJson = JSON.stringify(parsedContacts, null, 2);

    await fs.writeFile(contactsPath, finalContactsJson, "utf-8");
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
