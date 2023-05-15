const { Contact } = require("../models/contacts");
const { httpError, ctrlWrapper } = require("../utils");
const { User } = require("../models/user");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  res.json({ result });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const query = { owner, _id: contactId };
  const result = await Contact.findOneAndDelete(query);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(204).json({
    message: "Deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const query = { owner, _id: contactId };
  const result = await Contact.findOneAndUpdate(query, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const query = { owner, _id: contactId };
  const result = await Contact.findOneAndUpdate(query, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};