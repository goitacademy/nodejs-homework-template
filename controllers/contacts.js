const Contact = require("../models/contact");
const { status } = require("../consts");
const { HttpError, decoratorCtrl } = require("../helpers");

const getAll = async (_, res) => {
  const contacts = await Contact.find();
  res.json({ ...status.GET_SUCCESS, data: { contacts } });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.GET_SUCCESS, data });
};

const addItem = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(status.CREATED.status).json({ ...status.CREATED, data });
};

const deleteItem = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.DELETE_SUCCESS });
};

const updateItemById = async (req, res) => {
  const { contactId } = req.params;
  const obj = req.body;

  const data = await Contact.findByIdAndUpdate(contactId, obj, { new: true });

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
  updateStatusContact: decoratorCtrl(updateItemById),
};
