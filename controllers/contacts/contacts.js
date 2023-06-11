// const {Contact} = require("../../models/contact")
// const { HttpError, ctrlWrapper } = require("../../helpers");

// const getAllContacts = async (req, res) => {
//   const result = await Contact.find();
//   res.json(result);
// };
// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId);
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
  
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };
// const updateFavorite = async (req, res) => {
  
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };
// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "contact delete",
//   });
// };

// module.exports = {
//   getAllContacts: ctrlWrapper(getAllContacts),
//   getById: ctrlWrapper(getById),
//   addContact: ctrlWrapper(addContact),
//   updateContactById: ctrlWrapper(updateContactById),
//   updateFavorite: ctrlWrapper(updateFavorite),
//    deleteContactById: ctrlWrapper(deleteContactById),
// };
