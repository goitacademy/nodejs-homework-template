const { ObjectId } = require("mongodb");
const db = require("./db");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
};

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((el) => el.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

const addContact = async (body) => {
  const contact = await db.read();
  const newContact = {
    ...body,
  };
  contact.push(newContact);
  await db.write(contact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
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
