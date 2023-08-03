// const { Contact } = require("../models/contact");

// const { HttpError, ctrlWrapper } = require("../utilities");

// const listContacts = async (req, res) => {
//   const result = await Contact.find();
//   res.json(result);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;

//   const result = await Contact.findById(id);
//   if (!result) {
//     HttpError(404, "Not found");
//   }

//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const { id } = req.params;

//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }

//   res.json(result);
// };

// const updateStatusContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

//   if (!result) {
//     throw HttpError(404, "Not found");
//   }

//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndRemove(id);

//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }

//   res.json({ message: "contact deleted" });
// };

// module.exports = {
//   listContacts: ctrlWrapper(listContacts),
//   getById: ctrlWrapper(getById),
//   addContact: ctrlWrapper(addContact),
//   updateContact: ctrlWrapper(updateContact),
//   updateStatusContact: ctrlWrapper(updateStatusContact),
//   removeContact: ctrlWrapper(removeContact),
// };
