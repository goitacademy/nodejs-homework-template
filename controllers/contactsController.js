const { Contact } = require("../models/contact");
const { RequestError } = require("../utils");
const { ctrlWrapper } = require("../utils");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const isFavorite = favorite;

  if (!favorite) {
    const result = await Contact.find({ owner }, "-createdAt -ubdatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    return res.json(result);
  }

  const result = await Contact.find(
    { owner, favorite },
    "-createdAt -ubdatedAt",
    {
      skip,
      limit,
      match: { favorite: isFavorite },
    }
  ).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
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
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
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
