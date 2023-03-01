const Contact = require("../models/contact");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }
//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.json({ message: "contact deleted" });
// };

// const addContact = async (req, res) => {
//   const { error } = addSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: "missing required name field",
//     });
//   }
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const { error } = addSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: "missing fields",
//     });
//   }
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }
//   res.json(result);
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  // removeContact: ctrlWrapper(removeContact),
  // addContact: ctrlWrapper(addContact),
  // updateContact: ctrlWrapper(updateContact),
};
