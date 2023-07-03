const { Contact } = require("../models/contacts");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(data);
};

const getOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const addOneContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });

  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const updateFavoriteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContactById: ctrlWrapper(getOneContactById),
  addOneContact: ctrlWrapper(addOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
