const app = require("../../app");
const { contrWrapper } = require("../helpers/contrWrapper");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contact.service");

const getAll = async (req, res) => {
  const result = await listContacts();
  if (!result) throw contrWrapper(404, "Not Found");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await getById(id);
  if (!result) throw contrWrapper(404, "Not Found");
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await addContact(req.body);
  if (!result) throw contrWrapper(404, "Not Found");
  res.json(result);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) throw contrWrapper(404, "Not Found");
  res.json(result);
};

const updateCurrentContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await updateContact(id, body);
  if (!result) throw contrWrapper(404, "Not Found");
  res.json(result);
};

module.exports = {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateCurrentContact,
};
