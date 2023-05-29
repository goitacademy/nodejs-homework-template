const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const Contact = require("../models/contact-model");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body);
  if (!result) {
    throw HttpError(400, `missing fields`);
  }

  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body);
  if (!result) {
    throw HttpError(400, `missing fields`);
  }

  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
