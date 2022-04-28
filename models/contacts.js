const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  // try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  // }
  // catch (error)
  // {
  //   throw error;
  // }
};

const getContactById = async (id) => {
  const contact = await listContacts();
  const result = contact.find(item => item.id === id);
  if (!result) {
    throw new Error(`Contact id=${id} is not found`);
  }
  return result;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  const data = JSON.stringify(contacts, null, 3);
  await fs.writeFile(contactsPath, data);
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const oldContacts = contacts.findIndex(item => item.id === contactId);
  if (oldContacts === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(oldContacts, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}