const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const db = path.join(process.cwd(), 'src', 'db', 'contacts.json');

const getContacts = async () => {
  const data = await fs.readFile(db);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const contact = contacts.find(
    (contacts) => String(contactId) === String(contacts.id)
  );
  return contact || null;
};

const addContact = async (body) => {
  const contacts = await getContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  contacts.push(newContact);
  await fs.writeFile(db, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const index = contacts.findIndex(
    (contact) => String(contactId) === String(contact.id)
  );
  if (index === -1) {
    return null;
  }
  contacts[index] = Object.assign(contacts[index], { ...body });

  await fs.writeFile(db, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex(
    (contact) => String(contactId) === String(contact.id)
  );

  if (index === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(db, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
