const Contact = require("../models/contactModel");

// const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  console.log(result);
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

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({ message: "contact deleted" });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!req.body) {
//     throw HttpError(400, "missing fields");
//   }
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  // removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  // updateContact: ctrlWrapper(updateContact),
};
