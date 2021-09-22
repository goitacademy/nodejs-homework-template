const getAllContacts = require("./getAll");
const updateContacts = require("./updateContacts");

const removeContactById = async (contactId) => {
  const contacts = await getAllContacts();
  //   const newContacts = contacts.filter(
  //     (contact) => contact.id !== Number(contactId)
  //   );
  //   await updateContacts(newContacts);
  //   return "Success remove";

  const idx = contacts.findIndex((contact) => contact.id !== Number(contactId));
  if (idx === -1) {
    return null;
  }

  contacts.splice(idx, 1);
  await updateContacts(contacts);
  return "Success remove";
};

module.exports = removeContactById;

// import contactsOperations from "./index.js";

// const removeContactById = async (contactId) => {
//   const contacts = await contactsOperations.getAllContacts();

//   const idx = contacts.findIndex(
//     (contact) => String(contact.id) === String(contactId)
//   );
//   if (idx === -1) {
//     return null;
//   }
//   const removeContact = contacts[idx];

//   contacts.splice(idx, 1);
//   await updateContacts(contacts);
//   return removeContact;
// };

// export default removeContactById;
