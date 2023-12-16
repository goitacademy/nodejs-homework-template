import * as contactsService from "../models/index.js";
import { HttpError } from "../helpers/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contacts-schema.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(
        404,
        `The contact with id=${id} was not found in your contact list`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
      throw HttpError(
        404,
        `The contact with id=${id} was not found in your contact list`
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(
        404,
        `The contact with id=${id} was not found in your contact list`
      );
    }
    res.json({
      message: "Contact successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getAll,
  getById,
  addContact,
  updateById,
  deleteById,
};
