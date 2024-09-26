/** @format */
const contacts = require("../models/contacts");
const { controllerWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const onGetAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const onGetContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const onAddNewContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const onDeleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

const onUpdateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  onGetAllContacts: controllerWrapper(onGetAllContacts),
  onGetContactById: controllerWrapper(onGetContactById),
  onAddNewContact: controllerWrapper(onAddNewContact),
  onDeleteContact: controllerWrapper(onDeleteContact),
  onUpdateContact: controllerWrapper(onUpdateContact),
};
