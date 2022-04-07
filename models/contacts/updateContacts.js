const DB = require("../../db/db");
const { ObjectId } = require("mongodb");
const { getCollection } = require("./listContacts");
const updateContact = async (contactId, body) => {
  const collection = await getCollection(DB, "contacts");
  console.log(collection);

  const objId = new ObjectId(contactId);

  const { value: result } = await collection.updateOne(
    { _id: objId },
    { $set: body }
  );

  return result;
};

module.exports = { updateContact };
