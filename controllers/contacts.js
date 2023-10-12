const { Contact } = require("../models/contact");

const { HttpError, controllerWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const contact = req.body;
  const result = await Contact.create(contact);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const updatedContact = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) throw HttpError("Not found", 404);
  res.status(200).json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
