// const fs = require("fs/promises");
// const path = require("path");
// const { v4: uuid } = require("uuid");

// const db = require("./db");
// const { ObjectID } = require("mongodb");

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };
const Contact = require("../model/contact");

const listContacts = async () => {
  const results = await Contact.find();
  return results;
}; // getAll

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
}; // getByID

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
}; // create new

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: false }
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
