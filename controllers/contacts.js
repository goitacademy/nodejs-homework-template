const Contact = require("../models/contact");

// const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const listContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contactById = await contacts.getContactById(contactId);
//   if (!contactById) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(contactById);
// };

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const deleteContact = await contacts.removeContact(contactId);
//   if (!deleteContact) throw HttpError(404, "Not Found");
//   res.status(200).json({ message: "Contact was deleted" });
//   // res.status(204).send();
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const updateContact = await contacts.updateContact(contactId, req.body);
//   if (!updateContact) throw HttpError(404, "Not found");

//   res.status(200).json(updateContact);
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact),
};
