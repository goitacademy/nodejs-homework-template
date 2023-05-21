const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require("../services/contactsServices");
const HttpError = require("../utils/Errors");
const contactsValidation = require("../utils/schema");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await getContactsService();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactService(id);
    if (!contact) {
      throw new HttpError(404, `Contact not found`);
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = contactsValidation.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const body = req.body;
    const newContact = await createContactService(body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteContact = await deleteContactService(id);
    if (!deleteContact) {
      throw new HttpError(404, `Contact not found`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = contactsValidation.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const updatedContact = await updateContactService(id, req.body);
    if (!updatedContact) {
      throw new HttpError(404, `Contact not found`);
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
