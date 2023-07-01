const Contact = require("../models/contact");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

// const getContactId = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

// const postContact = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const putContact = async (req, res) => {
//   if (!req.body || Object.keys(req.body).length === 0) {
//     throw HttpError(400, "missing fields");
//   }
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json({ message: "contact deleted" });
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getContactId: ctrlWrapper(getContactId),
  // postContact: ctrlWrapper(postContact),
  // putContact: ctrlWrapper(putContact),
  // deleteContact: ctrlWrapper(deleteContact),
};
