const uuid = require("uuid");

const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("models", "contacts.json");

// const getContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath, "utf-8");
//     const parseData = JSON.parse(data);
//     return parseData;
//   } catch (error) {
//     console.log(error);
//   }
// };

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  try {
    const parseData = await listContacts();
    return parseData.filter((el) => el.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const parseData = await listContacts();
    const contacts = parseData.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    const parseData = await listContacts();
    const { name, email, phone } = body;
    parseData.push({ id: uuid.v1(), name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(parseData, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId);
    contacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
