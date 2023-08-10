const { catchAsync } = require("../../utils/catch");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const { HttpError } = require("../../utils/errors");
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("../../utils/validation/contactsValidation");

const getAll = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(contact);
};

const create = async (req, res) => {
  const { error, value } = schemaCreateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { name, email, phone } = value;

  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
};

const update = async (req, res) => {
  const contactId = req.params.contactId;

  const { error, value } = schemaUpdateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { name = null, email = null, phone = null } = value;

  const updatedContact = await updateContact(contactId, name, email, phone);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

const deleteById = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await removeContact(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: catchAsync(getAll),
  getById: catchAsync(getById),
  create: catchAsync(create),
  update: catchAsync(update),
  deleteById: catchAsync(deleteById),
};
