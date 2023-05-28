const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
  console.log(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

const post = async (req, res) => {
  console.log(req.body);
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const putById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  post: ctrlWrapper(post),
  deleteById: ctrlWrapper(deleteById),
  putById: ctrlWrapper(putById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
