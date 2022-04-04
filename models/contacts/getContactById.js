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
const { getCollection } = require("./listContacts.js");

const { DB } = require("../../db/db.js");
async function getContactById(contactId) {
  const collection = await getCollection(DB, "contacts");
  const objId = 
}
module.exports = {
  getContactById,
};
