const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

// Get all contacts =========================================

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// Get contact by ID ========================================

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// Create a new contact =====================================

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// Update a contact =========================================

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// Update a favorite =========================================

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (!favorite) {
    throw HttpError(400, "missing field favorite");
  }
  res.json(result);
};

// Delete a contact =========================================

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Delete success!",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
