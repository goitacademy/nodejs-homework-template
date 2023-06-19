// const { HttpError, ctrlWrapper } = require("../../utils/index");
// const { Contact } = require("../../models/contact");

// const getAllContacts = async (req, res, next) => {
//   const result = await Contact.find();

//   res.json(result);
// };

// const getContactById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found user with this ID!");
//   }
//   res.json(result);
// };

// const addContact = async (req, res, next) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res, next) => {
//   const { contactId } = req.params;

//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });

//   if (!result) {
//     throw HttpError(404, "Not found user with this ID!");
//   }
//   res.json(result);
// };

// const deleteContact = async (req, res, next) => {
//   const { contactId } = req.params;

//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found user with this ID!");
//   }
//   res.json({
//     message: "Contact deleted success!",
//   });
// };

// const updateFavorite = async (req, res, next) => {
//   const { contactId } = req.params;

//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });

//   if (!result) {
//     throw HttpError(404, "Not found user with this ID!");
//   }
//   res.json(result);
// };

// module.exports = {
//   getAllContacts: ctrlWrapper(getAllContacts),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   updateContact: ctrlWrapper(updateContact),
//   deleteContact: ctrlWrapper(deleteContact),
//   updateFavorite: ctrlWrapper(updateFavorite),
// };
