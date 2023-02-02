// const { Contact } = require("../models/contacts");

// async function listContacts(skip, limit, favorite) {
//     const queryParams = {};
//     if (favorite) {
//         queryParams.favorite = favorite;
//     }
    
//     return await Contact.find(queryParams)
//     .skip(skip)
//     .limit(limit)
//     .populate("owner");
// }
  
// async function getContactById(contactId) {
//     return await Contact.findById(contactId);
// }
  
// async function removeContact(contactId) {
//     const contact = await Contact.findById(contactId);

//     if (!contact) {
//         return "Not found";
//     }
//     await Contact.findByIdAndRemove(contactId);
// }
  
// async function addContact(userData) {
//     const { name, email, phone, favorite } = userData;
//     return await Contact.create({ name, email, phone, favorite });
// }
  
// async function updateContact(contactId, userData) {
//     const updatedContact = await Contact.findByIdAndUpdate(contactId, userData, {
//         new: true,
//     });
//     return updatedContact;
// }

// module.exports = {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
//     updateContact,
// }