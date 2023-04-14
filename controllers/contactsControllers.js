// const HttpError = require("../helpers");
// const { Contact } = require("../models/contacts");
// const { ctrlWrapper } = require("../utils");

// const getContacts = async (req, res) => {
//   const result = await Contact.find();
//   res.json(result);
// };

// const getContactById = async (req, res) => {
//   const { id } = req.params;
//   // const result = await Contact.findOne({ _id: id });
//   const result = await Contact.findById(id);
//   if (!result) {
//     throw HttpError(404, `Contacts with ${id} not found`);
//   }
//   res.json(result);
// };

// const postContact = async (req, res) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };

// const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndDelete(id);
//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not found`);
//   }
//   res.json({
//     message: "Delete success",
//   });
// };

// const changeContactbyId = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not found `);
//   }
//   res.json(result);
// };

// const changeStatusContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `Contact with ${id} not found `);
//   }
//   res.json(result);
// };

// module.exports = {
//   getContacts: ctrlWrapper(getContacts),
//   getContactById: ctrlWrapper(getContactById),
//   deleteContact: ctrlWrapper(deleteContact),
//   postContact: ctrlWrapper(postContact),
//   changeContactbyId: ctrlWrapper(changeContactbyId),
//   changeStatusContact: ctrlWrapper(changeStatusContact),
// };
