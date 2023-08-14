const { listContacts, getContactById, addContact, removeContact, updateContact  } = require('../models/contacts');
const { contactValidator } = require('../schemas/validatorContacts');
const { HttpError } = require("../helpers");

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact)      
    } else {
      throw HttpError(404, 'Not found')
    };
  } catch (error) {
    next(error)
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      const errorType = error.details[0];
      if (errorType.type === 'any.required') {
        throw HttpError(400, `missing required ${errorType.path[0]} field`)
      }
      throw HttpError(400, `${errorType.message}`)
    };

    const contact = await addContact(req.body);
    res.status(201).json(contact)
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const updateById = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      res.status(400).json( {message: `missing fields`} )
    };

    const { error } = contactValidator(req.body);
    if (error) {
      const errorType = error.details[0];
      if (errorType.type === 'any.required') {
        throw HttpError(400, `missing required ${errorType.path[0]} field`)
      }
      throw HttpError(400, `${errorType.message}`)
    };

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, 'Not found')
    };    
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
	  const contact = await removeContact(contactId);
    if (!contact) {
      throw HttpError(404, 'Not found')
    };    
    res.status(200).json({message: 'contact deleted'})
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAll,
  getById, 
  add, 
  updateById,
  deleteById,
}