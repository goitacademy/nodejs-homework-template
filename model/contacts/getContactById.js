const getAllContacts = require("./getAll");

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((contact) => contact.id === Number(contactId));
  if (!contact) {
    return null;
  }

  return contact;
};

module.exports = getContactById;

// import contactsOperations from "./index.js";

// const getContactById = async (contactId) => {
//   const contacts = await contactsOperations.getAllContacts();
//   const contact = contacts.find((contact) => contact.id === Number(contactId));
//   if (!contact) {
//     return null;
//   }

//   return contact;
// };

// export default getContactById;
