import * as contactsService from "../models/index.js";
import { HttpError } from "../helpers/index.js";

import {contactAddSchema} from "../utils/validation/contactValidationSchemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
}

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
}
catch (error) {
    next(error);
}
}

const updateById = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields empty");
    }
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
        throw HttpError(404, 'Not found' );
    }
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
}

const deleteById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.deleteContactById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(204).json({
        message: "Contact deleted"
    })
}
catch(error) {
    next(error);
}
}

export default {
  getAll: getAll,
  getById: getById,
  add: add,
  updateById: updateById,
  deleteById: deleteById,
}