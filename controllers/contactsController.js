const { Contact } = require("../models/contact");
const { RequestError } = require("../utils");
const { ctrlWrapper } = require("../utils");

const getListContacts = async (req, res) => {
  const filter = {};
  const { _id: owner } = req.user;
  const {
    page = 1,
    limit = 20,
    favorite = null,
    name = null,
    email = null,
  } = req.query;
  const validatePage = page > 0 ? page : 1;
  const validateLimit = limit < 1 || limit > 10 ? 10 : Number(limit);
  const skip = (validatePage - 1) * validateLimit;

  if (favorite) {
    filter.favorite = favorite;
  }
  if (name) {
    filter.name = name;
  }
  if (email) {
    filter.email = email;
  }
  const result = await Contact.find({ owner, ...filter })
    .skip(skip)
    .limit(validateLimit);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ id, owner });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ id, owner }, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ id, owner });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Delete saccess",
  });
};

module.exports = {
  getAll: ctrlWrapper(getListContacts),
  getById: ctrlWrapper(getContactById),
  add: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavoriteContact),
  removeById: ctrlWrapper(removeContact),
};
