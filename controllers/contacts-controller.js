// const Contact = require("../models/contact");
// const HttpError = require("../helpers/HttpError");
// const { ctrlWrapper } = require("../decorators/index");

// const getAll = async (req, res) => {
//   const {_id: owner} = req.user;
//   const {page = 1, limit = 20, ...query} = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Contact.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
//   res.json(result);
// };
// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findById(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
// };

// const add = async (req, res) => {  
//   const {_id: owner} = req.user;
//   const result = await Contact.create({...req.body, owner});
//   res.status(201).json(result);
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndDelete(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
// };

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
// };

// const updateStatusContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, `Movie with id=${id} not found`);
//   }
//   res.json(result);
// };

// module.exports = {
//   getAll: ctrlWrapper(getAll),
//   getById: ctrlWrapper(getById),
//   add: ctrlWrapper(add),
//   updateById: ctrlWrapper(updateById),
//   deleteById: ctrlWrapper(deleteById),
//   updateStatusContact: ctrlWrapper(updateStatusContact),
// };
