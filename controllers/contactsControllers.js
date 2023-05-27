const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require("../services/contactsServices");
const HttpError = require("../utils/Errors");
const {
  validateContact,
  validateUpdateStatus,
} = require("../middlewares/validation");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await getContactsService();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactService(contactId);
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
    const body = req.body;
    const newContact = await createContactService(body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deleteContact = await deleteContactService(contactId);
    if (!deleteContact) {
      throw new HttpError(404, `Contact not found`);
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContactService(contactId, req.body);
    if (!updatedContact) {
      throw new HttpError(404, `Contact not found`);
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContactService(contactId, req.body);
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
  createContact: [validateContact, createContact],
  updateContact: [validateContact, updateContact],
  deleteContact,
  updateStatusContact: [validateUpdateStatus, updateStatusContact],
};
