const metods = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const contacts = await metods.listContacts();
  res.json({
    contacts,
  });
};

const getById = async (req, res, next) => {
  const id = req.params["contactId"];
  const contact = await metods.getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    contact,
  });
};

const add = async (req, res, next) => {
  const data = req.body;
  const contact = await metods.addContact(data);
  res.status(201).json({
    contact,
  });
};

const delById = async (req, res, next) => {
  const id = req.params["contactId"];
  const contact = await metods.removeContact(id);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "contact deleted",
  });
};

const update = async (req, res, next) => {
  const data = req.body;
  const id = req.params["contactId"];
  const contact = await metods.updateContact(id, data);
  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    contact,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  delById: ctrlWrapper(delById),
  update: ctrlWrapper(update),
};