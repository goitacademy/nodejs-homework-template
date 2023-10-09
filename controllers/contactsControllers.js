const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../decorators /ctrl.Wrapper");

const contactAddSchema = require("../schemas/contacts");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(400, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(
    req.body.name,
    req.body.email,
    req.body.phone
  );
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: `contact deleted`,
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }

  try {
    const updatedContact = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
