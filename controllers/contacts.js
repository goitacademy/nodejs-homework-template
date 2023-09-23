const { Contact } = require("../models");

const { ctrlWrapper, HttpError } = require("../helpers");

const getContacts = async (_, res) => {
  const response = await Contact.find({});

  res.status(200).json(response);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const response = await Contact.findById(id);

  if (!response) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(response);
};

const addContact = async (req, res) => {
  const response = await Contact.create(req.body);

  res.status(201).json(response);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const response = await Contact.findByIdAndRemove(id);

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const response = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(response);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const response = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(response);  
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
