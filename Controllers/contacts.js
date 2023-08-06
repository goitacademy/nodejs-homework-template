const Joi = require('joi')

const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

const listContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);  
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found'); 
      // const error = new Error('Contact not found');
      // error.status = 404;
      // throw error;

      // return res.status(404).json({ message: 'Contact not found' })
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
          throw HttpError(400, 'missing required name field');
        }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: "contact deleted" });
}

const updateContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
          throw HttpError(400, 'missing fields');
        }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
        } 
      res.json(result);
}

module.exports = {
    addSchema,
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
}