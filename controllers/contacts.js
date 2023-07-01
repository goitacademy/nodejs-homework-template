const validateBody = require("../middlewares/valideteBody");
const schema = require("../schemas/addContSchema");
const contrsWrapper = require("../helpers/contrsWrapper");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const getAll = async (req, res) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};
const getById = async (req, res) => {
  const { contactId } = req.params;
  const findedContact = await getContactById(contactId);
  if (!findedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(findedContact);
};
const addCont = async (req, res) => {
  validateBody(schema);
  const result = await addContact(req.body);
  res.status(201).json(result);
};
const updateById = async (req, res) => {
  validateBody(schema);

  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
const removeCont = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = {
  getAll: contrsWrapper(getAll),
  getById: contrsWrapper(getById),
  addCont: contrsWrapper(addCont),
  removeCont: contrsWrapper(removeCont),
  updateById: contrsWrapper(updateById),
};
