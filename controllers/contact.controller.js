const Contact = require("../models/contacts.model");
const { requestError } = require("../helpers/api.helpers");

const getContactController = async (req, res, next) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id });
  res.status(200).json({ contacts });
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(requestError(404, "Not Found"));
  }

  return res.status(200).json({ contact });
};

const addContactController = async (req, res, next) => {
  const { _id } = req.user;
  const nemContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({ nemContact });
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    return next(requestError(404, "Not Found"));
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    return next(requestError(404, "Not Found"));
  }
  res.status(200).json({ updatedContact });
};

const updateFavoriteController = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    return next(requestError(404, "Not Found"));
  }
  res.status(200).json({ updatedContact });
};

module.exports = {
  getContactController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
};
