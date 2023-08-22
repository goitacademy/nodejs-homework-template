const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  if (favorite) {
    query.favorite = favorite === "true";
  }

  const data = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "contact deleted" });
};

const editContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  editContact: ctrlWrapper(editContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};

// mongodb + srv://IsaienkoViktor:<DlaQVXKgnhvEZXP0>@cluster0.fq7vncz.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://IsaienkoViktor:<DlaQVXKgnhvEZXP0>@cluster0.fq7vncz.mongodb.net/
