import * as contactServises from '../models/contacts.js';

export const getAll = async (req, res, next) => {
  try {
    const result = res.json(await contactServises.listContacts());
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    return result;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = req.url.substring(1);
    const result = res.json(await contactServises.getContactById(id));
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }
    return result;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = req.url.substring(1);
    res.json(await contactServises.removeContact(id));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const add = async (req, res, next) => {
  try {
    res.json(await contactServises.addContact(req.body));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
