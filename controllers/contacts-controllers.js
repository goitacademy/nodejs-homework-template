// const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");

const { Contact } = require("../models/contact");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId })
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Not found contact with ${contactId}`);
  }

  return res.json(result);
};

const addMyContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `contact with ${contactId} not found`);
  }

  res.json({
    message: "Contact deleted",
  });
};

const updateTheContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `contact with ${contactId} not found`);
  }
  res.json(result);
};

const updateTheFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `contact with ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addMyContact: ctrlWrapper(addMyContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateTheContact: ctrlWrapper(updateTheContact),
  updateTheFavorite: ctrlWrapper(updateTheFavorite),
};
