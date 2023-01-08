const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const listRaw = await fs.readFile(contactsPath);
  const listContacts = JSON.parse(listRaw);
  return listContacts;
}

async function writeContacts(list) {
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
}

const listContacts = async ({limit=0}) => {
  const listContacts = await readContacts();
  return listContacts.slice(-limit);
};

const getContactById = async (contactId) => {
  const list = await readContacts();
  const contactById = list.find((contact) => contact.id === contactId);

  return contactById;
};

const removeContact = async (contactId) => {
  const list = await readContacts();
  const contactToRemove = list.filter((contact) => contact.id !== contactId);
  await writeContacts(contactToRemove);
};

const addContact = async ({ name, email, phone }) => {
  const id = uuidv4();
  const contact = { id, name, email, phone };
  const list = await readContacts();
  list.push(contact);
  await writeContacts(list);
  return contact;
};

const updateContact = async (contactId, name, email, phone) => {
  const list = await readContacts();
  
  const [contactToUpdate] = list.filter((item) => item.id === contactId);
  contactToUpdate.name = name;
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;

  const newContacts = [...list];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
