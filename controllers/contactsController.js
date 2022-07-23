const { createError } = require("../helpers");
const { serviceContacts } = require("../services");

const getContacts = async (req, res) => {
  const result = await serviceContacts.getAllContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceContacts.getContactById(id);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await serviceContacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceContacts.deleteContactById(id);
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceContacts.updateContactById(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

const updateContactFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceContacts.updateContactById(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateContactFavoriteById,
};
