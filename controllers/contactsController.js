const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const get = async (req, res) => {
  const data = await listContacts();
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

const add = async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json({ data, status: 201, message: "operation successful" });
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "contact deleted" });
};

const change = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  const data = await updateContact(contactId, body);
  if (!data) {
    return res.status(404).json({ status: 404, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

module.exports = {
  get,
  getById,
  add,
  remove,
  change,
};
