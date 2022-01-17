// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../db");

// const successRes = result => ({
//   status: "success",
//   code: 200,
//   data: {
//     result,
//   },
// });

// const notFoundRes = contactId => ({
//   status: "error",
//   code: 404,
//   message: `Contact with id=${contactId} not found`,
// });

// module.exports = {
//   async getContactsController(req, res) {
//     const contacts = await listContacts();

//     res.json(successRes(contacts));
//   },

//   async getContactByIdController(req, res) {
//     const { contactId } = req.params;

//     const contact = await getContactById(contactId);

//     if (!contact) {
//       res.status(404).json(notFoundRes(contactId));
//       return;
//     }

//     res.json(successRes(contact));
//   },

//   async postContactController(req, res) {
//     const newContact = await addContact(req.body);

//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result: newContact,
//       },
//     });
//   },

//   async deleteContactController(req, res) {
//     const { contactId } = req.params;

//     const deletedContact = await removeContact(contactId);

//     if (!deletedContact) {
//       res.status(404).json(notFoundRes(contactId));
//       return;
//     }

//     res.json({
//       status: "success",
//       code: 200,
//       message: "Contact deleted",
//     });
//   },

//   async putContactController(req, res) {
//     const { contactId } = req.params;

//     const updatedContact = await updateContact(contactId, req.body);

//     if (!updatedContact) {
//       res.status(404).json(notFoundRes(contactId));
//       return;
//     }

//     res.json(successRes(updatedContact));
//   },
// };
