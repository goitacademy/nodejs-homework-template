const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { conrollerWraper } = require("../helpers/controllerWraper");
const { HttpError } = require("../helpers/HttpError");

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

const createContact = async (req, res) => {
  const newContact = await addContact({ ...req.body });
  res.json({ status: "success", code: 201, data: { contact: newContact } });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const isDeleted = await removeContact(contactId);
  if (!isDeleted) {
    throw HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }

  res
    .status(200)
    .json({ status: "success", code: 200, message: "contact deleted" });
};
const rewriteContact = async (req, res) => {
  const { contactId } = req.params;
  const isUpdate = await updateContact(contactId, req.body);
  if (!isUpdate) {
    throw HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }

  res.status(200).json({ status: "success", code: 200, data: isUpdate });
};

module.exports = {
  getAll: conrollerWraper(getAll),
  getById: conrollerWraper(getById),
  createContact: conrollerWraper(createContact),
  deleteContact: conrollerWraper(deleteContact),
  rewriteContact: conrollerWraper(rewriteContact),
};
