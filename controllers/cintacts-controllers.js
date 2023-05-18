const { HttpError } = require("../helpers/index");
const contactService = require("../models/contacts");
const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res, next) => {
  const result = await contactService.listContacts();
  res.json(result);
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};
const addContact = async (req, res) => {
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(204).send();
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
