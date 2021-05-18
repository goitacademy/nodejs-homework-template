const db = require("./db");
const { ObjectID } = require("mongodb");

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
  console.log("contactId", contactId);
  const collection = await getCollection(db, "contacts");
  const [result] = await collection
    .find({ _id: new ObjectID(contactId) })
    .toArray();
  console.log("result", result);
  return result;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const { value: result } = await collection.findOneAndDelete({
    _id: new ObjectID(contactId),
  });
  return result;
};

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");
  const newContact = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  };
  const {
    ops: [result],
  } = await collection.insertOne(newContact);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const { value: result } = await collection.findOneAndDelete(
    {
      _id: new ObjectID(contactId),
    },
    { $set: body }, {returnOriginal: false}
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
