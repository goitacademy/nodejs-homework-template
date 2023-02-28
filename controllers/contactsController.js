const { HttpError } = require("../helpers");
const { Contacts } = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await Contacts.find({});
  console.log(contacts);
  res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
};

const postContact = async (req, res, next) => {
  const body = req.body;
  const contact = await Contacts.create(body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    next(HttpError(404, "Not found"));
  }
  await Contacts.findByIdAndRemove(contactId);
  res.status(200).json({ message: "contact deleted" });
};

// const putContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const body = req.body;
//   const contact = await updateContact(contactId, body);
//   if (!contact) {
//     return next(HttpError(404, "Not found"));
//   }
//   res.status(200).json(contact);
// };

module.exports = {
  getContacts,
  getContact,
  postContact,
  // putContact,
  deleteContact,
};
