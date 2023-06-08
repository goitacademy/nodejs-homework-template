// const contacts = require('../models/contacts');

// const { HttpError } = require('../help');

// const { ctrlWrapper } = require('../dec');

// const Joi = require('joi');

// const contactAddSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// const getAllContacts = async (req, res) => {
//   const allContacts = await contacts.listContacts();
//   res.json(allContacts);
// };

// const getContactsById = async (req, res) => {
//   const { contactId } = req.params;
//   const contactByID = await contacts.getContactById(contactId);
//   if (!contactByID) {
//     throw HttpError(404);
//   }
//   res.json(contactByID);
// };

// const addContact = async (req, res) => {
//   const { error } = contactAddSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, `missing required name field ${error.message}`);
//   }
//   const addContact = await contacts.addContact(req.body);
//   res.status(201).json(addContact);
// };

// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contactByID = await contacts.removeContact(contactId);
//   if (!contactByID) {
//     throw HttpError(404);
//   }
//   res.json({ message: 'contact deleted' });
// };

// const updateContactById = async (req, res) => {
//   // const { error } = contactAddSchema.validate(req.body);
//   // if (error) {
//   //   throw HttpError(400, 'missing fields');
//   // }
//   const { contactId } = req.params;
//   const contactByID = await contacts.updateContact(contactId, req.body);
//   if (!contactByID) {
//     throw HttpError(404);
//   }
//   res.json(contactByID);
// };

// module.exports = {
//   getAllContacts: ctrlWrapper(getAllContacts),
//   getContactsById: ctrlWrapper(getContactsById),
//   addContact: ctrlWrapper(addContact),
//   deleteContactById: ctrlWrapper(deleteContactById),
//   updateContactById: ctrlWrapper(updateContactById),
// };
