const { Contact } = require("../models");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators/");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const results = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(results);
};

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw HttpError(404, `Movie with ${req.params.contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const results = await Contact.create({ ...req.body, owner });
  res.status(201).json(results);
};

const deleteContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);
  if (!result) {
    throw HttpError(404, `Movie with ${req.params.contactId} not found`);
  }
  res.json(result);
};

const updateContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, `Movie with ${req.params.contactId} not found`);
  }
  res.status(201).json(result);
};

const updateFavorite = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, `Movie with ${req.params.contactId} not found`);
  }
  res.status(201).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
