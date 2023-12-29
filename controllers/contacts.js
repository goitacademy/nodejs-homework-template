const contactsFunctions = require("../models/contacts");

const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const listContacts = async (req, res, next) => {
  const data = await contactsFunctions.listContacts();
  res.json(data);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  res.json({ message: "template message" });
};

const addContact = async (req, res, next) => {
  res.json({ message: "template message" });
};

const removeContact = async (req, res, next) => {
  res.json({ message: "template message" });
};

const updateContact = async (req, res, next) => {
  res.json({ message: "template message" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
