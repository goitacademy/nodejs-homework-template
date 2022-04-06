// const { getCollection } = require("./listContacts");
// const DB = require("../config/db");
// const addContact = async (body) => {
//   const collection = await getCollection(DB, "contacts");
//   const newContact = {
//     ...body,
//   };
//   const result = await collection.insertOne(newContact);
//   return await collection.findOne({ _id: result.insertedId });
// };
const Contact = require("../models/contacts");

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

module.exports = {
  addContact,
};
