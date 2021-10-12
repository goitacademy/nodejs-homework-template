const { ObjectId } = require("mongodb");
const db = require("./db");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const contacts = await getCollection(db, "Contacts");
  const result = await contacts.find({}).toArray();
  return result;
};

const getContactById = async (id) => {
  const contacts = await getCollection(db, "Contacts");
  const oid = new ObjectId(id);
  const [result] = await contacts.find({ _id: oid }).toArray();
  return result;
};

const removeContact = async (id) => {
  const contacts = await getCollection(db, "Contacts");
  const oid = new ObjectId(id);
  const { value: result } = await contacts.findOneAndDelete({ _id: oid });
  return result;
};

const addContact = async (body) => {
  const newContact = {
    isFavorite: false,
    ...body,
  };
  const contacts = await getCollection(db, "Contacts");
  const result = await contacts.insertOne(newContact);
  return await getContactById(result.insertedId);
};

const updateContact = async (id, body) => {
  const contacts = await getCollection(db, "Contacts");
  const oid = new ObjectId(id);
  const { value: result } = await contacts.findOneAndUpdate(
    { _id: oid },
    { $set: body },
    { returnDocument: "after" }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
