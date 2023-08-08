const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts.js");

const { RequestError } = require("../helpers");
const { bodySchema } = require("../schemas/contacts.js");

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not found");
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const validationResult = bodySchema.validate(req.body);
    const body = req.body;

    if (validationResult.error) {
      throw RequestError(400, "missing required name field");
    }
    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const validationResult = bodySchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      throw RequestError(400, "missing fields");
    }

    const contactUpdate = await updateContact(contactId, body);

    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, add, remove, update };
