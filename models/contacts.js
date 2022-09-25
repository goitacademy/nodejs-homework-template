const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function readData() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

async function writeData(array) {
  const data = JSON.stringify(array, null, 2);
  await fs.writeFile(contactsPath, data);
}

const listContacts = async () => {
  const allContacts = await readData();

  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await readData();

  const id = contactId.toString();
  const oneContact = allContacts.find((contact) => contact.id === id);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await readData();

  const id = contactId.toString();
  const index = allContacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(index, 1);

  await writeData(allContacts);

  return removedContact;
};

const addContact = async (body) => {
  const allContacts = await readData();
  const { name, email, phone } = body;

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);

  await writeData(allContacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await readData();
  const { name, email, phone } = body;

  const id = contactId.toString();

  const index = allContacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  allContacts[index] = { id, name, email, phone };

  await writeData(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
