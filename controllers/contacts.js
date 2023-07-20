const contacts = require("../models/contacts.js");
const {HttpError} = require('../helpers');
const {ctrlWrapper} = require('../helpers');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().required(), 
  phone: Joi.string().required()
})

const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
}

const getById = async (req, res) => {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}

const add = async (req, res) => {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field")
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const remove = async (req, res) => {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json({"message": "contact deleted"});
}

const update = async (req, res) => {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields")
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.status(200).json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll), 
  getById: ctrlWrapper(getById), 
  add: ctrlWrapper(add), 
  remove: ctrlWrapper(remove), 
  update: ctrlWrapper(update)
}