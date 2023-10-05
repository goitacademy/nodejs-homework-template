import Joi from 'joi';
import { HttpError } from '../helpers/index.js';
import * as contactServises from '../models/contacts.js';
const contactAddShcema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
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
  const { contactId } = req.params;
  try {
    const result = await contactServises.getContactById(contactId);
    if (!result) {
      throw HttpError(404, ' Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactServises.removeContact(contactId);
    console.log('result', result);
    if (!result) {
      throw HttpError(404, `Not found `);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const createContact = await contactServises.addContact(name, email, phone);
    if (!Object.keys(req.body).length) throw HttpError(400, 'All fields empty');
    const { error } = contactAddShcema.validate(req.body);
    if (error) {
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
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const result = await contactServises.updateContact(
    contactId,
    name,
    email,
    phone
  );
  const { error } = contactAddShcema.validate(req.body);
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, 'All fields empty');
    } else if (error) {
      throw HttpError(
        404,
        (error.message = `missing required ${error.details[0].path} field`)
      );
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, deleteById, add, put };
