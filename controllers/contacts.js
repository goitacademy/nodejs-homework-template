const apiStore = require("../models/contacts");
const { status } = require("../consts");
const { HttpError, decoratorCtrl, validateContact } = require("../helpers");

const getAll = async (_, res) => {
  const data = await apiStore.listContacts();
  res.json({ ...status.GET_SUCCESS, data });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await apiStore.getContactById(contactId);

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.GET_SUCCESS, data });
};

const addItem = async (req, res) => {
  validateContact(req.body);
  const data = await apiStore.addContact(req.body);
  res.status(status.CREATED.status).json({ ...status.CREATED, data });
};

const deleteItem = async (req, res) => {
  const { contactId } = req.params;
  const data = await apiStore.removeContact(contactId);

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.DELETE_SUCCESS, data });
};

const updateItemById = async (req, res) => {
  const { contactId } = req.params;
  const obj = req.body;
  validateContact(obj);

  const data = await apiStore.updateContact(contactId, obj);

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.PUT_SUCCESS, data });
};

module.exports = {
  getAll: decoratorCtrl(getAll),
  getById: decoratorCtrl(getById),
  addItem: decoratorCtrl(addItem),
  deleteItem: decoratorCtrl(deleteItem),
  updateItemById: decoratorCtrl(updateItemById),
};
