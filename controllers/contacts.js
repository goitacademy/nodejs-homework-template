const { HttpError, ctrlWrapper } = require("../utils/index");

const contacts = require("../models/contacts");

const getAll = async (req, res) => {
  const rezult = await contacts.listContacts();
  if (!rezult) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(rezult);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const rezult = await contacts.getContactById(id);
  if (!rezult) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(rezult);
};

const add = async (req, res, next) => {
  const id = req.body;
  const rezult = await contacts.addContact(id);
  if (!rezult) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).send(rezult);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  const rezult = await contacts.removeContact(id);
  if (!rezult) {
    throw HttpError(404, "Not found");
  }
  return res.status(201).send({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const value = req.body;
  const { contactId } = req.params;
  const rezult = await contacts.updateContact(contactId, value);
  if (!rezult) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).send(rezult);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
