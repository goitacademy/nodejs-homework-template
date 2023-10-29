const { Contact } = require("../models/Contact");
const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "username email");
  res.json(result);
};

const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const addNewContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json(result);
};

const removeByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByIdContact: ctrlWrapper(getByIdContact),
  addNewContact: ctrlWrapper(addNewContact),
  updateByIdContact: ctrlWrapper(updateByIdContact),
  removeByIdContact: ctrlWrapper(removeByIdContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
