const contacts = require("../models/contacts");
const httpError = require("../helpers/httpError");
const Wrapper = require("../helpers/Wrapper");

const listContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result); 
}

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  }); 
}

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
}

module.exports = {
  listContacts: Wrapper(listContacts),
  getContactById: Wrapper(getContactById),
  removeContact: Wrapper(removeContact),
  addContact: Wrapper(addContact),
  updateContact: Wrapper(updateContact),
};
