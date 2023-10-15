const Joi = require('joi')

const contacts = require('../models/contacts')

const HttpErr = require('../helpers/HttpErr')

const ctrlWrapper = require('../helpers/ctrlWrapper')

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

const getAll = async (req, res) => {
        const response = await contacts.listContacts();
        res.json(response)

};

const getById = async (req, res) => {
        const { contactId } = req.params
        const response = await contacts.getContactById(contactId)
        if (!response) {
            throw HttpErr(404, 'Not Foun')
        }
        res.json(response)
};

const addContact = async (req, res) => {
        const { error } = addScheme.validate(req.body)
        if (error) {
            throw HttpErr(400, error.message)
        }
        const response = await contacts.addContact(req.body);
        res.status(201).json(response);
};

const removeContact = async (req, res) => {
        const { id } = res.params;
        const response = await contacts.removeContact(id)
        if (!response) {
            throw HttpErr(404, 'Not Foun')
        }
        res.status({
            message: 'Done'
        })
};

const updateContact = async (req, res) => {
        const { error } = addScheme.validate(req.body)
        if (error) {
            throw HttpErr(400, error.message)
        }
        const { id } = res.params;
        const response = await contacts.updateContact(id, req.body)
        if (!response) {
            throw HttpErr(404, 'Not Foun')
        }
        res.json(response);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
}