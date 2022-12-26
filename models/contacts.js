const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, ".", "contacts.json");

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function readContacts() {
  try {
    const rawData = await fs.readFile(contactsPath);
    const data = await JSON.parse(rawData);
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contact = await getContactById(contactId);
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(filteredContacts);
  return contact;
};

const addContact = async (body) => {
  const id = nanoid();
  const contact = { id, ...body };
  const contacts = await readContacts();
  contacts.push(contact);
  await writeContacts(contacts);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...body } : contact
  );
  await writeContacts(updatedContacts);
  return await getContactById(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
