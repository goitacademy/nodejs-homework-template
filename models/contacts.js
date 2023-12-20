const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  if (!contacts.some((contact) => contact.id === contactId)) {
    return null;
  }

  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const indexContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (indexContact === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(indexContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  if (
    contacts.some(
      ({ name: userName, email: userEmail, phone: userPhone }) =>
        userName === name || userPhone === phone || userEmail === email
    ) ||
    !name ||
    !email ||
    !phone
  ) {
    return null;
  }

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, phone, email } = body;
  if (
    !name ||
    !phone ||
    !email ||
    !contacts.some((contact) => contact.id === contactId)
  )
    return null;

  let updateContact = {};
  const updateContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      updateContact = { name, phone, email, id: contactId };
      return { name, phone, email, id: contactId };
    }
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};