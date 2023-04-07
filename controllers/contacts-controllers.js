
// const addSchema = require('../schemas');
const { Contact }  = require('../models');
const { ctrlWrapper} = require('../utils');
// const { HttpError } = require('../helpers');


const listContacts = async (req, res) => {
  const result = await Contact.find()
  res.json(result)
}


// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId)
//   if (!result) {
//     throw HttpError(404, `Contact with ${contactId} not found!`);
//   }
//   res.json(result)
// }

const addContact = async (req, res) => {
 
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId)
//   if (!result) {
//     throw HttpError(404, `Contact with ${contactId} not found!`);
//   }
//   res.json({
//     message: "Contact deleted"
//   })
// }

// const updateContact = async (req, res) => {
  
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body)
//   console.log(result);
//   if (!result) {
//     throw HttpError(404, `Contact with ${contactId} not found!`);
//   }
//   res.json(result)
// }

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact)
}