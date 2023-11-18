const { Contact } = require("../models/contacts");

const httpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw httpError(404, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
