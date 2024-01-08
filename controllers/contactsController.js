const { HttpError, controllerWrapper } = require('../helpers');
const Contact = require('../models/contact');

const fetchAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const fetchContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found').HttpError;
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found').HttpError;
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, 'Not found').HttpError;
  }
  res.json({ message: 'Contact deleted' });
};

const updateFavoritesStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    throw HttpError(400, 'missing field favorite').HttpError;
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found').HttpError;
  }

  res.json(result);
};

module.exports = {
  listContacts: controllerWrapper(fetchAllContacts),
  getContactById: controllerWrapper(fetchContactById),
  addNewContact: controllerWrapper(addNewContact),
  updateContact: controllerWrapper(updateContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateFavoritesStatus: controllerWrapper(updateFavoritesStatus),
};
