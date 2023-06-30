// const contacts = require("../models/.contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const data = await Contact.find();
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const data = await Contact.findOne({ _id: id });
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const add = async (req, res) => {
  const data = await Contact.create(req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).json(data);
};

// const updateById = async (req, res) => {
//   const id = req.params;
//   const data = await contacts.updateContact(id, req.body);
//   if (!data) {
//     throw HttpError(404, "Not found");
//   }
//   return res.status(201).json(data);
// };

// const deleteById = async (req, res) => {
//   const id = req.params;
//   const data = await contacts.removeContact(id);
//   if (!data) {
//     throw HttpError(404, "Not found");
//   }
//   return res.status(200).json(data);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
