const { randomUUID } = require("crypto");
const DB = require("./db");
const db = new DB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter(
    (contact) => contact.id === contactId
  );
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await db.read();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const contactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIdx !== -1) {
    const [contact] = contacts.splice(contactIdx, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const contactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIdx !== -1) {
    contacts[contactIdx] = {
      ...contacts[contactIdx],
      ...body,
    };
    await db.write(contacts);
    return contacts[contactIdx];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
