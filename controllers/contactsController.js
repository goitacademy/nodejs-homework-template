const RequestError = require("../helpers/RequestError");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json({ status: "success", code: 200, data: { contacts } });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({ status: "success", code: 200, data: { result } });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
  const { id } = req.params;

  const result = await updateContact(id, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.status(201).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await addContact(name, email, phone);

  res.status(201).json({ status: "success", code: 201, data: { newContact } });
};

module.exports = {
  getContacts,
  getById,
  changeContact,
  createContact,
  deleteContact,
};
