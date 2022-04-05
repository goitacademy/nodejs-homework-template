const { ObjectId } = require("mongodb");
const DB = require("../../config/db");
const { getCollection } = require("./listContacts");

const removeContact = async (contactId) => {
  const collection = await getCollection(DB, "contacts");
  const objId = new ObjectId(contactId);
  const { value: result } = await collection.findOneAndDelete({ _id: objId });
  return result;
};

module.exports = {
  removeContact,
};
