// // const contacts = require("../models/contacts");
// const {HttpError, ctrlWrapper } = require("../../helpers");
// const {Contact} = require("../../models/contact")


// const getAllContact = async (req, res) => {
//   const result = await Contact.find();
//   res.json(result);
// };

// const getContactById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await Contact.findById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };

// const updateContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body,{new: true});
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const updateContactFavorite = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body,{new: true});
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const deleteContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndDelete(id);
//   if (!result) {
//     throw HttpError(400, "Not found");
//   }
//   res.json({ message: "Delete success" });
// };

// module.exports = {
//   getAllContact: ctrlWrapper(getAllContact),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   updateContactById: ctrlWrapper(updateContactById),
//   updateContactFavorite: ctrlWrapper(updateContactFavorite),
//   deleteContactById: ctrlWrapper(deleteContactById),
// };
