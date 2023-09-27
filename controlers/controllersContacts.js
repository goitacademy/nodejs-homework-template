import * as contactServises from '../models/contacts.js';

const getAll = async (req, res, next) => {
  const result = res.json(await contactServises.listContacts());
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  return result;
};

const getById = async (req, res, next) => {
  const id = req.url.substring(1);
  const result = res.json(await contactServises.getContactById(id));
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  return result;
};

export const deleteById = async (req, res, next) => {
  const id = req.url.substring(1);
  res.json(await contactServises.removeContact(id));
};

export const add = async (req, res, next) => {
  try {
    res.json(await contactServises.addContact(req.body));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { getAll, getById, deleteById, add };
