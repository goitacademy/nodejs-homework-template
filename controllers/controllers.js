import contactsService from "../models/contacts.js";

import HttpError from "../helpers/HttpError.js";

import { contactsAddSchema } from "../schemas/schemas.js";

const getAll = async (request, response, next) => {
  try {
    const result = await contactsService.listContacts();
    response.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (request, response, next) => {
  try {
    const { error } = contactsAddSchema.validate(request.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(request.body);
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (request, response, next) => {
  try {
    const { error } = contactsAddSchema.validate(request.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = request.params;
    const result = await contactsService.updateContact(contactId, request.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (request, response, next) => {
  try {
    const { contactId } = request.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    response.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
