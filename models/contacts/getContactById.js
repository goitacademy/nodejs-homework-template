// const { listContacts } = require("./listContacts");

// async function getContactById(contactId) {
//   const listContact = await listContacts();

//   const result = listContact.find((item) => item.id === contactId);
//   return result;
// }
// module.exports = {
//   getContactById,
// };

const { ObjectId } = require("mongodb");
const { getCollection } = require("./listContacts");
const { DB } = require("../../db/db");

async function getContactById(contactId) {
  const collection = await getCollection(DB, "contacts");
  const objId = new ObjectId(contactId);
  const { value: result } = await collection.findOne({ _id: objId });
  return result;
}
module.exports = {
  getContactById,
};
