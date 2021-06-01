const db = require("./db");
const { ObjectId } = require("mongodb");
// const fs = require("fs/promises");
// const path = require("path");
// // const contacts = require("./contacts.json");
// const { v4: uuid } = require("uuid");

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
  const objId = new ObjectId(contactId);
  const [result] = await collection.find({ _id: objId }).toArray();
  return result;
  // const data = await getData();
  // const result = data.filter((contact) => String(contact.id) === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectId(contactId);
  const { value: result } = await collection.findOneAndDelete({ _id: objId });
  return result;
  // const data = await getData();
  // const result = data.filter((contact) => String(contact.id) !== contactId);
  // await fs.writeFile(
  //   path.join(__dirname, "contacts.json"),
  //   JSON.stringify(result, null, 2)
  // );
  // return result;
};

const addContact = async (body) => {
  // const { name, email, phone, favorite } = body;
  const newContact = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  };
  // const data = await getData();
  const collection = await getCollection(db, "contacts");
  // collection.push(newContact);
  // await fs.writeFile(
  //   path.join(__dirname, "contacts.json"),
  //   JSON.stringify(data)
  // );
  const {
    ops: { result },
  } = await collection.insertOne(newContact);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectId(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnOriginal: false }
  );
  // const data = await getData();

  // const result = data.filter((contact) => String(contact.id) === contactId);
  // if (result) {
  //   Object.assign(result, body);
  //   await fs.writeFile(
  //     path.join(__dirname, "contacts.json"),
  //     JSON.stringify(data)
  //   );
  // }
  return result;
};

const updateStatusContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectId(contactId);
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
  updateStatusContact,
};
