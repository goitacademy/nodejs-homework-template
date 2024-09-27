const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const contactsService = require("../models/contacts");
const { contactsSchema } = require("../schemas");

const getAll = async (_, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);

  if (!result) throw HttpError(404);

  res.json(result);
};

const addNewContact = async (req, res) => {
  const { error } = contactsSchema.add.validate(req.body);

  if (error) throw HttpError(400, "missing required name field");

  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);

  if (!result) throw HttpError(404);

  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { error } = contactsSchema.update.validate(req.body);

  if (error) throw HttpError(400, "missing required name field");

  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNewContact: ctrlWrapper(addNewContact),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
