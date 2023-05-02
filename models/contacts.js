const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    throw new Error(`Contact with id=${contactId} not found!`);
  }
  return contact;
};
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const [result] = contacts.filter((item) => item.id === contactId);

  if (!result) {
    return null;
  }

  Object.assign(result, body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findIdx = contacts.findIndex((item) => item.id === contactId);
  if (findIdx === -1) {
    console.log(`We have no contact with this id = ${contactId}!`);
    return null;
  }
  const [removeContact] = contacts.splice(findIdx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
};

const addContact = async ({ name, phone, email }) => {
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
