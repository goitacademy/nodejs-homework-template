const fs = require("fs/promises");
const contacts = require("./contacts.json");
// const path = require("path");
// const contacts = path.resolve("model/contacts.json");
let posts = [
  { id: "1", topic: "test1", text: "test text1" },
  { id: "2", topic: "test2", text: "test text2" },
  { id: "3", topic: "test3", text: "test text3" },
];

const listContacts = async () => {
  await res.json({ posts });
};
// try {
//   // const contacts = await Contacts.listContacts();
//   return res.json({
//     status: "success",
//     code: 200,
//     data: {
//       contacts,
//     },
//   });
// } catch (error) {
//   console.log(error);
// }
// };

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
