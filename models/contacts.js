import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
import { HttpError } from '../helpers/index.js';

const contactPath = path.resolve('models', 'contacts.json');

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
    const createContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = await listContacts();
    const newArr = [createContact, ...allContacts];
    await fs.writeFile(contactPath, JSON.stringify(newArr, null, 2));
    return createContact;
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const item = allContacts.find(el => el.id === contactId);
};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
