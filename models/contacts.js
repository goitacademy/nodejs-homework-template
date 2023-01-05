const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath, { encoding: "utf8" });
  const parseContactsList = JSON.parse(contactsList);
  return parseContactsList;
};

async function writeContact(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts();

  const getContactById = contactsList.find(
    (contact) => contact.id === contactId
  );

  return getContactById;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const uptateContact = contactsList.filter(
    (contact) => contact.id !== contactId
  );

  return await writeContact(uptateContact);
};

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContact = { id: v4(), name, email, phone };

  contactsList.push(newContact);
  await writeContact(contactsList);
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const contact = {
    id: contactId,
    name,
    email,
    phone,
  };

  contacts[idx] = contact;
  await writeContact(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
