// const db = require("./db");
// const { ObjectId } = require("mongodb");
const Contact = require("../model/contact");

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };

const listContacts = async () => {
  // const collection = await getCollection(db, "contacts");
  // const results = await collection.find({}).toArray();
  const results = await Contact.find();
  return results;
};

const getContactById = async (contactId) => {
  // const collection = await getCollection(db, "contacts");
  // const objId = new ObjectId(contactId);
  // const [result] = await collection.find({ _id: objId }).toArray();
  const result = await Contact.findById(contactId);
  return result;
};

const removeContact = async (contactId) => {
  // const collection = await getCollection(db, "contacts");
  // const objId = new ObjectId(contactId);
  // const { value: result } = await collection.findOneAndDelete({ _id: objId });
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

const addContact = async (body) => {
  // const newContact = {
  //   ...body,
  //   ...(body.favorite ? {} : { favorite: false }),
  // };
  // const collection = await getCollection(db, "contacts");
  // const {
  //   ops: { result },
  // } = await collection.insertOne(newContact);
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  // const collection = await getCollection(db, "contacts");
  // const objId = new ObjectId(contactId);
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objId },
  //   { $set: body },
  //   { returnOriginal: false }
  // );
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    {
      new: true,
    }
  );
  return result;
};

const updateStatusContact = async (contactId, body) => {
  // const collection = await getCollection(db, "contacts");
  // const objId = new ObjectId(contactId);
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objId },
  //   { $set: body },
  //   { returnOriginal: false }
  // );
  const result = await Contact.findByIdAndUpdate(
    contactId,
    {...body},
    {
      new: true,
    }
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
