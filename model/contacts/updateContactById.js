const getAllContacts = require("./getAll");
const updateContacts = require("./updateContacts");

const updateContactById = async (contactId, data) => {
  const contacts = await getAllContacts();

  const idx = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const updateContact = { ...contacts[idx], ...data };
  contacts[idx] = updateContact;

  await updateContacts(contacts);
  return updateContact;
};
module.exports = updateContactById;

// import contactsOperations from "./index.js";

// const updateContactById = async (contactId, data) => {
//   const contacts = await contactsOperations.getAllContacts();
//   const updateContacts = await contactsOperations.updateContacts(contacts);

//   const idx = contacts.findIndex((contact) => contact.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const updateContact = { ...contacts[idx], ...data };
//   contacts[idx] = updateContact;

//   await updateContacts(contacts);
//   return updateContact;
// };
// export default updateContactById;
