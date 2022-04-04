// const fs = require("fs/promises");
// const path = require("path");
// const listContacts = require("./listContacts");

// const contactsPath = path.join(__dirname, "../../db/db.js");

// const removeContact = async (contactId) => {
//   const contacts = await listContacts.listContacts();
//   const delContact = contacts.find((item) => item.id === contactId);
//   if (!delContact) {
//     return null;
//   } else {
//     const newListContact = contacts.filter((item) => item.id !== contactId);
//     await fs.writeFile(contactsPath, JSON.stringify(newListContact));
//   }
//   return delContact;
// };

// module.exports = {
//   removeContact,
// };

const { ObjectId } = require("mongodb");
const { DB } = require("../../db/db");
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
