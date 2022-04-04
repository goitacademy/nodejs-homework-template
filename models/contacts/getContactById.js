const { getCollection } = require("./listContacts");
const { ObjectId } = require("mongodb");
const DB = require("../../db/db");

async function getContactById(contactId) {
  const collection = await getCollection(DB, "contacts");
  const objId = new ObjectId(contactId);
  const result = await collection.findOne({ _id: objId });
  return result;
}
module.exports = {
  getContactById,
};
