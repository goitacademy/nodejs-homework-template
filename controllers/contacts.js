const Contact = require("../models/contact");

const { HttpError, controlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};
// const getContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.getContactById(id);
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
//   const { id } = req.params;
//   const result = await contacts.updateContact(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.removeContact(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({ message: "Contact is deleted" });
// };

module.exports = {
  listContacts: controlWrapper(listContacts),
  // getContactById: controlWrapper(getContactById),
  // addContact: controlWrapper(addContact),
  // updateContact: controlWrapper(updateContact),
  // removeContact: controlWrapper(removeContact),
};
