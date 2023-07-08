const Contacts = require("../models/contactsModel")
const { HttpError } = require('../helpers')
const catchAsync = require('../utils/catchAsync')

const listContacts = async (req, res) => {
  const result = await Contacts.find({}, "-createdAt -updatedAt -__v");

  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await Contacts.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

const addContact = async (req, res) => {
  const result = await Contacts.create(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  listContacts: catchAsync(listContacts),
  getContactById: catchAsync(getContactById),
  removeContact: catchAsync(removeContact),
  addContact: catchAsync(addContact),
  updateContact: catchAsync(updateContact),
  updateFavorite: catchAsync(updateFavorite),
}
