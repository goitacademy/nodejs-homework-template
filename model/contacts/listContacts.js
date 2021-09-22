const getAllContacts = require("./getAll");

const listContacts = async () => {
  const contacts = await getAllContacts();
  return contacts;
};

module.exports = listContacts;

// import contactsOperations from "./index.js";

// const listContacts = async () => {
//   const contacts = await contactsOperations.getAllContacts();
//   return contacts;
// };

// export default listContacts;
