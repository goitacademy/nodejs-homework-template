// const {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContact,
//   removeContact,
// } = require("../../services/contactsService");
  
// const HttpError = require("../../helpers/HttpError.js");
  
// async function getContactsService(req, res, next) {
//   try {
//     const contacts = await listContacts();
//     return res.json(contacts);
//   } catch (error) {
//     return next(new HttpError(400, error.message));
//   }
// }
  
// async function getContactService(req, res, next) {
//   const { contactId } = req.params;

//   try {
//     const contact = await getContactById(contactId);
//     return res.json(contact);
//   } catch (error) {
//     return next(new HttpError(404, "Contact is not found!"));
//   };
// }
  
// async function createContactService(req, res, next) {
//   const { name, email, phone, favorite } = req.body;

//   try {
//     const newContact = await addContact({name, email, phone, favorite});
//     return res.status(201).json(newContact);
//   } catch (error) {
//     return next(new HttpError(400, "Missing fields"));
//   } 
// }
  
// async function removeContactService(req, res, next) {
//   const { contactId } = req.params;

//   try {
//     await removeContact(contactId);
//     return res.status(200).json({ message: "Contact deleted" });
//   } catch (error) {
//     return next(new HttpError(404, "No found"));
//   }
// }
  
// async function updateContactService(req, res, next) {
//   if (!Object.keys(req.body).length) {
//     return next(new HttpError(400, "Missing fields"));
//   }

//   const { contactId } = req.params;

//   try {
//     const updatedContact = await updateContact(contactId, req.body, {
//       new: true,
//     });
//     return res.status(200).json(updatedContact);
//   } catch (error) {
//     return next(new HttpError(404, "Contact not found"));
//   }
// }

// async function updateStatusContactService (req, res, next) {
//   const keys = Object.keys(req.body);
//   const contactWithUpdField = keys.find((value) => value === "favorite");

//   if (!contactWithUpdField) {
//     return next(new HttpError(400, "Missing fields favorite")); 
//   }

//   const {contactId} = req.params;
//   try {
//     const updatedContact = await updateContact(contactId, req.body, {
//       new: true,
//     });
//     return res.status(200).json(updatedContact);
//   } catch (error) {
//     return next(new HttpError(404, "Not found"));
//   }
// }
  
// module.exports = {
//   updateContactService,
//   removeContactService,
//   createContactService,
//   getContactService,
//   getContactsService,
//   updateStatusContactService,
// };