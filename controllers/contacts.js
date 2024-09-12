const { Contact } = require("../models/contact");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/httpError");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = true } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, " ", { skip, limit });
  res.json(result);
};

const getContatcById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const postContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete succes",
  });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateCFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContatcById: ctrlWrapper(getContatcById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateCFavorite: ctrlWrapper(updateCFavorite),
};
