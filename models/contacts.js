const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  // console.log(JSON.parse(data))
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactById = data.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const strPhone = String(phone);

  const newContact = { id: nanoid(), name, email, strPhone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  const contactToUpdateIndex = data.findIndex(contact => contact.id === contactId
  );
  if (contactToUpdateIndex === -1) {
    return null;
  }
  const strPhone = String(phone);
  data[contactToUpdateIndex] = { id: nanoid(), name, email, strPhone };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  // console.log("data[contactToUpdateIndex]", data[contactToUpdateIndex]);
  return data[contactToUpdateIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
