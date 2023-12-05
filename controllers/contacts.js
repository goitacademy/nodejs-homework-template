const { ctrlWrapper, HttpError } = require("../helpers");
const Contact = require("../models/contact");

const get = async (req, res) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(data);
};

const getByID = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById({ _id: contactId });

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json(data);
};

const create = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json(data);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json(data);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  get: ctrlWrapper(get),
  getByID: ctrlWrapper(getByID),
  create: ctrlWrapper(create),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
  remove: ctrlWrapper(remove),
};
