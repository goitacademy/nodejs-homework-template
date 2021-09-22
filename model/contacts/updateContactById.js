const getAllContacts = require("./getAll");
const updateContacts = require("./updateContacts");

const updateContactById = async (id, data) => {
  const contacts = await getAllContacts();

  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const updateContact = { ...contacts[idx], ...data };
  contacts[idx] = updateContact;

  await updateContacts(contacts);
  return updateContacts;
};
module.exports = updateContactById;

// import contactsOperations from "./index.js";

// const updateContactById = async (id, data) => {
//   const contacts = await contactsOperations.getAllContacts();
//   const updateContacts = await contactsOperations.updateContacts(contacts);

//   const idx = contacts.findIndex((contact) => contact.id === id);
//   if (idx === -1) {
//     return null;
//   }
//   const updateContact = { ...contacts[idx], ...data };
//   contacts[idx] = updateContact;

//   await updateContacts(contacts);
//   return updateContacts;
// };
// export default updateContactById;
