const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  // const [result] = contacts.splise(index, 1);
  const newContactsList = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await rewriteContacts(newContactsList);
  return "result" || null;
};

const rewriteContacts = async (contacts) => {
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts)); this one is works but
  //   for goodloking JSON file we have to use nxt:
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await rewriteContacts(contacts);
  return newContact || null;
};
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  await rewriteContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
