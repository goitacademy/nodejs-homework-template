// const { Contact } = require("../../models/contact");

// const { HttpError, ctrlWrapper } = require("../../helpers");
// // getAll
// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;

//   const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
//     skip,
//     limit,
//   }).populate("owner", "name email");
//   res.json(result);
// };
// // getById
// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };
// // add
// const postContactById = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Contact.create({ ...req.body, owner });
//   res.status(201).json(result);
// };
// // updateContactById
// const putContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const updateFavorite = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const deleteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   console.log(result);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({ message: "contact deleted" });
// };

// module.exports = {
//   getAll: ctrlWrapper(getAll),
//   getContactById: ctrlWrapper(getContactById),
//   postContactById: ctrlWrapper(postContactById),
//   putContactById: ctrlWrapper(putContactById),
//   updateFavorite: ctrlWrapper(updateFavorite),
//   deleteContactById: ctrlWrapper(deleteContactById),
// };
