const Joi = require('joi');

const contacts = require('../models/contacts');

const { HttpError } = require('../helpers');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});


const getListContacts = async (req, res) => {
    const result = await contacts.getListContacts();
    res.json(result);
  }

const getContactById = async (req, res) => {
    const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  }

// const postContacts = async (req, res, next) => {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   }

const removeContact = async (req, res) => {
    const {id} = req.params;
    const result = await contacts.removeContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({
      message: 'Delete success'
    })
  }

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
  }

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContact: ctrlWrapper(removeContact),
};
