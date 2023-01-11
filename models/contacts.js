const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

// const writeContact = async (contacts) => {
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

const listContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath);
  return JSON.parse(contactsRaw);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {};

// const addContact = async (body) => {
//   const id = nanoid();
//   const { name, email, phone } = body;

//   const contact = { id, name, email, phone };

//   const db = await readDb();
//   db.push(contact);

//   await writeDb(db);

//   return contact;
// };

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  updateContact,
};
