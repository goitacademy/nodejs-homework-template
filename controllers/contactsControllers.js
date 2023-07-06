const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
} = require("../services/contactsServices");
const { addSchema } = require("../utils/addSchema");
const { HttpError } = require("../helpers/HttpError");

const getListContacts = async (req, res, next) => {
  try {
    const result = await listContactsService();

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    console.log("contactId - ", contactId);
    const result = await getContactByIdService(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const createContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContactService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContactService(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }

    const result = await updateContactService(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getListContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
