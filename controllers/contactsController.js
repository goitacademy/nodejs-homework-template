import HttpError from "../helpers/HttpError.js";
import contactsService from '../models/contacts.js';

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
     throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error);
  }
}

const add = async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: 'contact deleted' })
  }
  catch (error) {
    next(error);
  }
}

const updateById = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
        throw HttpError(400, `missing fields`); 
    }
   const { contactId } = req.params;
   const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result);
  }
  catch (error) {
    next(error)
  }
}

export default  {
    getAll,
    getById,
    add,
    deleteById,
    updateById
}