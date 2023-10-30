const { HttpErrors, CtrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(contact);
};

const addContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(updatedContact);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(updatedContact);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  addContact: CtrlWrapper(addContact),
  deleteContact: CtrlWrapper(deleteContact),
  updateContact: CtrlWrapper(updateContact),
  updateFavorite: CtrlWrapper(updateFavorite),
};
