const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const schema = require("../schemas/schemas");

const getAll = async (req, res) => {
  const data = await contacts.listContacts();

  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await contacts.getContactById(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

const addContact = async (req, res) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (typeof error !== "undefined") {
    throw HttpError(400, { message: error.details[0].message });
  }

  const newContact = await contacts.addContact(value);

  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);

  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  if (body) {
    const data = await contacts.updateContact(contactId, body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ contact: data });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
