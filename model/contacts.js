// const fs = require("fs/promises");
// const path = require("path");
// const { v4: uuid } = require("uuid");

const db = require("./db");
const { ObjectID } = require("mongodb");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
}; // getAll

const getContactById = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectID(contactId);
  const [result] = await collection.find({ _id: objId }).toArray();
  return result;
}; // getByID

const removeContact = async (contactId) => {
  const objId = new ObjectID(contactId);
  const collection = await getCollection(db, "contacts");

  const { value: result } = await collection.findOneAndDelete({ _id: objId });
  return result;
};

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");
  const record = {
    ...body,
    ...(body.inArray ? {} : { inArray: false }),
  };
  const {
    ops: [result],
  } = await collection.insertOne(record);
  return result;
}; // create new

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false }
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
