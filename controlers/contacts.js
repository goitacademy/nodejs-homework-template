// const contacts = require("../models/contacts");
const { Contact } = require("../models/contact.js");

const { HttpError } = require("../utils");
const { ctrlWrapper } = require("../utils/ctrlWrapper");

// const getAll = async (req, res) => {
//   const result = await contacts.listContacts();
//   res.json(result);
// };
const getAll = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "NotFound");
    //   const error = new Error("Not found");
    //   error.status = 404;
    //   throw error;
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "Delete success" });
  // res.status(204).send()
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "NotFound");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
