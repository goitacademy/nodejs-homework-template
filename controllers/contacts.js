const Contact = require("../models/contact")



const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json({ result });
};

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
// const removeById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json({
//     message: "contact deleted",
//   });
// };
// const updateById = async (req, res) => {

//   const { contactId } = req.params;
//   const result = contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
//   getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
//   removeById: ctrlWrapper(removeById),
//   updateById: ctrlWrapper(updateById),
};
