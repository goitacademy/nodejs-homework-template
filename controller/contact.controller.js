const {
  listContacts,
  getContactById,
  addContact,
  updateContacts,
  removeContact,
} = require("../models/contacts");
const { ErrorHandling } = require("../helper/errorReq");

const getAll = async (req, res) => {
  const result = await listContacts();
  if (!result) throw ErrorHandling(404, "Not Found");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) throw ErrorHandling(404, "Not Found");
  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await addContact(req.body);
  if (!result) throw ErrorHandling(400, "missing required name field");
  res.status(201).json(result);
};

const updateContactId = async (req, res) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await updateContacts(contactId, req.body);
  if (!result) throw ErrorHandling(404, "Not Found");
  res.json(result);
};
const removeContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (result) throw ErrorHandling(200, "contact deleted");
  if (!result) throw ErrorHandling(404, "Not Found");
  res.json(result);
};

module.exports = {
  getAll,
  getById,
  addNewContact,
  updateContactId,
  removeContactId,
};
