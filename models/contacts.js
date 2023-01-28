const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () =>
  // { limit = 0 }
  {
    const contactsRaw = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsRaw);
    return contacts;
    // .slice(-limit);
  };

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const currentContacts = contacts.find((contact) => contact.id === contactId);
  return currentContacts || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deleteContacts = contacts.filter((todo) => todo.id !== contactId);
  await writeContacts(deleteContacts);
};

const addContact = async (title) => {
  const id = nanoid();
  const contact = { id, title };

  const contacts = await listContacts();
  contacts.push(contact);
  await writeContacts(contacts);

  return contact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
