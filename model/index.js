const { ObjectID } = require("mongodb");
const db = require("./db");
const getCollection = require("../helpers/getCollection");

const addContact = async (body) => {
  const newContact = { ...body };
  const collection = await getCollection(db, "contacts");
  const {
    ops: [result],
  } = await collection.insertOne(newContact);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const objectId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false }
  );
  return result;
};

async function listContacts() {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
}

async function getContactById(contactId) {
  const collection = await getCollection(db, "contacts");
  const objectId = new ObjectID(contactId);
  const [result] = await collection.find({ _id: objectId }).toArray();
  return result;
}

async function removeContact(contactId) {
  const collection = await getCollection(db, "contacts");
  const objectId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndDelete({
    _id: objectId,
  });
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
