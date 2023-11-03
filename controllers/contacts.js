const { HttpError } = require("../helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { contactAddShema, contactUpdateShema } = require("../shemas/contacts");

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
      next();
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await removeContact(contactId);

    if (!contact) {
      next();
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    if (!req.body) {
      throw HttpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);

    if (contact) {
      res.status(200).json(contact);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, add, deleteById, updateById };
