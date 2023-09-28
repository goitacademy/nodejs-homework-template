import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
import { HttpError } from '../helpers/index.js';
import Joi from 'joi';

const contactPath = path.resolve('models', 'contacts.json');
const contactAddShcema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
export const listContacts = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactPath);
    if (!data) {
      throw HttpError(404, "message: 'Not found'");
    }
    return JSON.parse(data);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const allContact = await listContacts();
    const elIdx = allContact.findIndex(el => el.id === contactId);
    const result = allContact[elIdx];
    if (!result) {
      throw HttpError(404, `message: Movie whith id ${contactId}  not found `);
    }
    const newArr = allContact.filter((el, idx) => idx !== elIdx);
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    return result;
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const allContacts = await listContacts();
    const resp = allContacts.find(el => el.id === contactId);
    if (!resp) {
      throw HttpError(404, `message: Movie whith id ${contactId}  not found `);
    }
    return resp;
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    if (!Object.keys(req.body).length) throw HttpError(400, 'All fields empty');
    const { error } = contactAddShcema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const createContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = await listContacts();
    const newArr = [createContact, ...allContacts];
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    res.status(201).json(createContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const { contactId } = req.params;
    if (!Object.keys(req.body).length) throw HttpError(400, 'All fields empty');
    const { error } = contactAddShcema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const createContact = {
      name,
      email,
      phone,
    };

    const allContacts = await listContacts();
    const newArr = allContacts.map(el => {
      if (el.id === contactId) {
        return (el = createContact);
      }
      return el;
    });

    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    res.status(201).json(createContact);
  } catch (error) {
    next(error);
  }
};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
