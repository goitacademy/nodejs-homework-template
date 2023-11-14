import contactsService from "../models/contacts.js";
import { addContactSchema } from "../schemas/contacts-schemas.js";
import { HttpError } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsService.getContactByID(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteByID = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsService.updateContactByID(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getByID,
  add,
  deleteByID,
  update,
};
