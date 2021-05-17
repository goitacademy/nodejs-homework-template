const db = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts');
  const results = collection.find({}).toArray();
  return results;
};

const getContactById = async contactId => {
  const collection = await getCollection(db, 'contacts');
  const [result] = await collection
    .find({ _id: new ObjectId(contactId) })
    .toArray();
  return result;
};

const addContact = async body => {
  const collection = await getCollection(db, 'contacts');
  const record = { ...body };
  const {
    ops: [result],
  } = await collection.insertOne(record);
  return result;
};

const removeContact = async contactId => {
  const collection = await getCollection(db, 'contacts');
  const { value: result } = await collection.findOneAndDelete({
    _id: new ObjectId(contactId),
  });
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts');
  const { value: result } = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(contactId),
    },
    { $set: body },
    { returnOriginal: false },
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
