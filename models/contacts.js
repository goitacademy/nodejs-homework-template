const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsRaw);
  console.log(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactToFind = contacts.find((contact) => contact.id === contactId);
  console.log(contactToFind);
  return contactToFind;
};

const removeContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactToDelete = contacts.find((contact) => contact.id === contactId);
  if (!contactToDelete) {
    return null;
  }
  const remainingСontacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(remainingСontacts));
  console.log(contactToDelete);
  return contactToDelete;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const [contactToUpdate] = contacts.filter((item) => item.id === contactId);
  contactToUpdate.name = name;
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;
  const newContacts = [...contacts];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.log(contactToUpdate);
  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};