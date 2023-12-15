

const Contact = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");


const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
 
//   const { contactId } = req.params;

//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.removeContact(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "contact deleted",
//   });
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   updateContact: ctrlWrapper(updateContact),
//   deleteContact: ctrlWrapper(deleteContact),
};
