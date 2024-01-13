// const contacts = require("../models/contacts");

const Contact = require("../models/contact");

// const { HttpError, ctrlWrapper } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

// const getContactById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const getContact = await contacts.getContactById(contactId);

//   if (!getContact) {
//     throw HttpError(404, "Not found!");
//   }
//   res.status(200).json(getContact);
// };

// const addContact = async (req, res, next) => {
//   const requiredFields = ["name", "email", "phone"];
//   const missingFields = requiredFields.filter((field) => !(field in req.body));
//   if (missingFields.length > 0) {
//     return res.status(400).send({
//       message: `missing required ${missingFields.join(", ")} field(s)`,
//     });
//   }

//   const addedContact = await contacts.addContact(req.body);
//   console.log(req.body);
//   res.status(201).json(addedContact);
// };

// const removeContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const deletedContact = await contacts.removeContact(contactId);
//   console.log(deletedContact);
//   if (!deletedContact) {
//     throw HttpError(404, "Not found!");
//   }
//   res.json({ message: "contact deleted" });
// };

// const updateContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const updatedContact = await contacts.updateContact(contactId, req.body);
//   if (!updatedContact) {
//     throw HttpError(404, "Not found!");
//   }
//   res.status(200).json(updatedContact);
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact),
};
