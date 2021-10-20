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
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(contactId);
  const [result] = await collection.find({ _id: oid }).toArray();
  return result;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(contactId);

  const { value: result } = await collection.findOneAndDelete({ _id: oid });
  return result;
};

const addContact = async (body) => {
  const newContact = {
    favorite: false,
    ...body,
  };
  const collection = await getCollection(db, "cats");
  const result = await collection.insertOne(newContact);
  return await getContactById(result.insertedId);
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
