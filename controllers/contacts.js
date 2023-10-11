const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const getByContactId = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, ownerId: owner });

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteByContactId = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndRemove({ _id: id, ownerId: owner });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateByContactId = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: id, ownerId: owner },
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, ownerId: owner },
    { favorite },
    { new: true }
  );

  if (!updatedContact) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByContactId: ctrlWrapper(getByContactId),
  add: ctrlWrapper(add),
  deleteByContactId: ctrlWrapper(deleteByContactId),
  updateByContactId: ctrlWrapper(updateByContactId),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
