const Contact = require("../models/contact");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators/");

const getAllMovies = async (req, res) => {
  const results = await Contact.find();
  res.json(results);
};

// const getById = async (req, res) => {
//   const result = await contactsService.getContactById(req.params.contactId);
//   if (!result) {
//     throw HttpError(404, `Movie with ${req.params.contactId} not found`);
//   }
//   res.json(result);
// };

const addContact = async (req, res) => {
  const results = await Contact.create(req.body);
  res.status(201).json(results);
};

// const deleteContact = async (req, res) => {
//   const result = await contactsService.removeContact(req.params.contactId);
//   if (!result) {
//     throw HttpError(404, `Movie with ${req.params.contactId} not found`);
//   }
//   res.json({ message: "Delete success" });
// };

// const updateContact = async (req, res, next) => {
//   const result = await contactsService.updateContact(
//     req.params.contactId,
//     req.body
//   );
//   if (!result) {
//     throw HttpError(404, `Movie with ${req.params.contactId} not found`);
//   }
//   res.status(201).json(result);
// };

module.exports = {
  getAllMovies: ctrlWrapper(getAllMovies),
  // getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // updateContact: ctrlWrapper(updateContact),
};
