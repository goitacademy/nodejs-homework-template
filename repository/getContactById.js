// const { getCollection } = require("./listContacts");
// const { ObjectId } = require("mongodb");
// const DB = require("../config/db");

// async function getContactById(contactId) {
//   const collection = await getCollection(DB, "contacts");
//   const objId = new ObjectId(contactId);
//   console.log(objId);
//   const result = await collection.findOne({ _id: objId });
//   return { ...result, createdDate: objId.getTimestamp() };
// }

const Contact = require("../models/contacts");

async function getContactById(contactId) {
  const result = await Contact.findOne({ _id: contactId });
  return result;
}

module.exports = {
  getContactById,
};
