const { HttpError, controllerWrapper } = require("../helpers");

const addContactShema = require("../schemas/contactSchema.js");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts.js");

const getAll = async (_req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const create = async (req, res) => {
  const { error } = addContactShema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { error } = addContactShema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const body = req.body;
  const result = await updateContact(id, body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, "Not contact");
  } else {
    res.json({ message: "contact deleted" });
  }
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  create: controllerWrapper(create),
  updateById: controllerWrapper(updateById),
  removeById: controllerWrapper(removeById),
};
