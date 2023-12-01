const Contact = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }
  res.status(200).json({ status: "success", code: 200, data });
};

const addContacts = async (req, res, next) => {
  const result = await Contact.addContact(req.body);
  res.status(201).json(result);
};
const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  if (data === undefined || data.favorite === undefined) {
    return res.status(400).json({ message: "missing field 'favorite'" });
  }
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!result) {
    throw HttpError(
      404,
      `Contact with id=${contactId} not found and not updated`
    );
  }
  res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: `Contact with id=${contactId} deleted successfully`,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContacts: ctrlWrapper(addContacts),
  updateById: ctrlWrapper(updateById),
  deleteContact: ctrlWrapper(deleteContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
