import Joi from 'joi';
import { HttpError } from '../helpers/index.js';
import * as contactServises from '../models/contacts.js';
const contactAddShcema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const getAll = async (req, res, next) => {
  try {
    const result = await contactServises.listContacts();

    if (!result) {
      throw HttpError(404, "message: 'Not found'");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await contactServises.getContactById(req, res, next);
    if (!result) {
      throw HttpError(404, "message: 'Not found'");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const result = await contactServises.removeContact(req, res, next);
    console.log('result', result);
    if (!result) {
      throw HttpError(404, `message: Not found `);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const createContact = await contactServises.addContact(req, res, next);
    if (!Object.keys(req.body).length) throw HttpError(400, 'All fields empty');
    const { error } = contactAddShcema.validate(req.body);
    if (error) {
      console.log('error', error.details[0].path);
      throw HttpError(
        404,
        (error.message = `missing required ${error.details[0].path} field`)
      );
    }
    res.status(201).json(createContact);
  } catch (error) {
    next(error);
  }
};

export const put = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const allContacts = await contactServises.listContacts();

  const idxEl = allContacts.findIndex(el => el.id === contactId);
  const { error } = contactAddShcema.validate(req.body);
  try {
    if (error) {
      throw HttpError(400, error.message);
    }
    res.json(await contactServises.updateContact(req, res, next));
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, deleteById, add, put };
