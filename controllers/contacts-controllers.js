
// const addSchema = require('../schemas');
// const { Contact }  = require('../models');
// const { HttpError } = require('../helpers');
// const { ctrlWrapper} = require('../utils');


// const listContacts = async (req, res) => {
//   const result = await Contact.find({})
//   res.json(result)
// }


// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId)
//   if (!result) {
//     throw HttpError(404, `Contact with ${contactId} not found!`);
//   }
//   res.json(result)
// }

// const addContact = async (req, res) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// }

// const updateContact = async (req, res) => {
  
//   const {contactId} = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})

//   if (!result) {
//     throw HttpError(404, `Contact with ${contactId} not found!`);
//   }
//   res.json(result)
// }

// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const { favorite } = req.body;
//   const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
//     if (!result) {
//         throw HttpError(404, `"Not found"`);
//     }
//     res.json(result);
// }


// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId)
//   if (!result) {
//     throw HttpError(404, `Contact with ${contactId} not found!`);
//   }
//   res.json({
//     message: "Contact deleted"
//   })
// }

// module.exports = {
//   listContacts: ctrlWrapper(listContacts),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   updateContact: ctrlWrapper(updateContact),
//   updateStatusContact : ctrlWrapper(updateStatusContact ),
//   removeContact: ctrlWrapper(removeContact),
// }