const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContact = async (req, res) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  res.json(data);
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

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json({ message: "contact deleted" });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };
module.exports = {
  listContact: ctrlWrapper(listContact),
  // getContactById: ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // updateContact: ctrlWrapper(updateContact),
  // removeContact: ctrlWrapper(removeContact),
};
