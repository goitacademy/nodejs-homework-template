// const DB = require("../config/db");
// const { ObjectId } = require("mongodb");
// const { getCollection } = require("./listContacts");
// const updateContact = async (contactId, body) => {
//   const collection = await getCollection(DB, "contacts");
//   console.log(collection);

//   const objId = new ObjectId(contactId);
//   console.log(objId);

//   const { value: result } = await collection.updateOne(
//     { _id: objId },
//     { $set: body }
//   );

//   return result;
// };

const Contact = require("../models/contacts");

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );

  return result;
};

module.exports = { updateContact };
