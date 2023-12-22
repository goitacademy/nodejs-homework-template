import * as contactService from "../models/contacts.js";

import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contacts-schemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const addNew = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const arr = Object.keys(req.body);
    if (arr.length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const result = await contactService.updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  removeById,
  addNew,
  updateById,
};
