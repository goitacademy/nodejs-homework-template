const { ObjectId } = require("mongodb");
const db = require("./db");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const result = await collection.find({}).toArray();
  return result;
};

const getContactById = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(contactId);
  const [result] = await collection.find({ _id: oid }).toArray();

  if (!result) {
    return null;
  }
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
    ...body,
    favorite: true,
  };
  const collection = await getCollection(db, "contacts");
  const result = await collection.insertOne(newContact);
  return await getContactById(result.insertedId);
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const oid = new ObjectId(contactId);
  const { value: result } = await collection.findOneAndUpdate(
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
