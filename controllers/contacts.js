const { controllerWrapper, checkId } = require("../helpers");

const { Contact } = require("../models");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const result = await Contact.findById(req.params.contactId);
  checkId(result);
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  checkId(result);
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  checkId(result);
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
  checkId(result);
  res.json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getById: controllerWrapper(getById),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
