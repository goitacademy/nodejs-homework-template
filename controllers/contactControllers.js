const HttpError = require("../utils/HttpError");
const addSchema = require("../controllers/contactSchema");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId, req.body);

    res.json({ message: "Contact was removed" });

    if (!contact) {
      throw new HttpError(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const contact = await addContact(req.body);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updatedContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  addNewContact,
  updatedContact,
};
