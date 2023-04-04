const {listContacts, getContactById, addContact, removeContact, updateContact} = require("../models/contacts");
const { HttpError } = require("../helpers/HttpError");

const { ctrlWrapper } = require("../utils");

// ------------------------------------------------------------------------ | ROUTERS
const getList = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const update = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ "message": "missing fields" });
    // throw HttpError(400, "missing fields");
  }
  const result = await updateContact(contactId, req.body);
  console.log("ITS ME RESULT", result);
  if (!result) {
    return res.status(404).json({ "message": "Not found" });
    // throw HttpError(404, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};