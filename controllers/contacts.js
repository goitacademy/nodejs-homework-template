const { HttpError } = require("../helpers");

const { Contact } = require("../models");

const ctrlWrapper = require("../wrappers");

const getAllContacts = async (req, res, next) => {
  const allContacts = await Contact.find();
  console.log(allContacts);
  res.json(allContacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const foundContact = await Contact.findById(contactId);

  if (!foundContact) {
    throw HttpError(404, "Not found");
  }

  res.json(foundContact);
};

const addContact = async (req, res, next) => {
  const addContact = await Book.create(req.body);
  res.status(201).json(addContact);
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const ubdateFavourite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "Delete succes",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  changeContact: ctrlWrapper(changeContact),
  deleteContact: ctrlWrapper(deleteContact),
  ubdateFavourite: ctrlWrapper(ubdateFavourite),
};
