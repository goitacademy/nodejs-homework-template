const { HttpError } = require("../helpers");
const Contact = require("../models/contacts/contacts");
const ctrlWrapper = require("../utils/ctrlWrapper");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner");
  return res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  return res.json(result);
};

const addContact = async (req, res) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
res.status(201).json(result);};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "missing field favorite");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  return result;
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not Found");
  res.status(200).json(result);
};

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavourite: ctrlWrapper(updateFavourite),
  updateContactById: ctrlWrapper(updateContactById),
  addContact: ctrlWrapper(addContact),
};
