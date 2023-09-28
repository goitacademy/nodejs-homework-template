import * as contactServises from '../models/contacts.js';

const getAll = async (req, res, next) => {
  const result = res.json(await contactServises.listContacts(req, res, next));
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  return result;
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = res.json(await contactServises.getContactById(req, res, next));
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  return result;
};

export const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  res.json(await contactServises.removeContact(req, res, next));
};

export const add = async (req, res, next) => {
  try {
    res.json(await contactServises.addContact(req.body));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { getAll, getById, deleteById, add };
