const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

// =====================  ALL CONTACTS  ==================
const listContacts = async () => {
  let contacts;
  await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => (contacts = JSON.parse(data)))
    .catch((error) => console.log(error));
  // console.log(contacts);
  return contacts;
};
// listContacts();

// =====================  GET CONTACT BY ID  ================
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contactId === contact.id);
  console.log(result);
  if (!result) {
    return null;
  }
  return result;
};
// getContactById("2");

// =====================  ADD CONTACT  ==================
const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // console.table(contacts);
  return newContact;
};

// =====================  REMOVE CONTACT  ==================
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  // console.log(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // console.log(removedContact);
  return removedContact;
};

// =====================  UPDATE CONTACT BY ID  ==================
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // console.table(contacts);
  return contacts[idx];
};

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = contactsOperations;
