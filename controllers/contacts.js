const{ HttpError, ctrlWrapper} = require('../helpers');
const contacts = require('../models/contacts');

const Joi = require('joi');

const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
});

const getContacts = async (_, res) => {
    
    res.json(await contacts.listContacts())
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await (contacts.getContactById(contactId))
    
    if (!contact) {
        throw HttpError(404, 'Not found');
    }
    res.json(contact)
};

const postContact = async (req, res, next) => {

        const { error } = Schema.validate(req.body);
        if (error) {
            throw HttpError(400,error.message)
        };

        const result = await contacts.addContact(req.body);
        res.status(201).json(result) 
};

const deleteContact = async (req, res, next) => {
  
        const { contactId } = req.params; 
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404, 'Not Found')
        }
        res.status(200).json({ message: 'The contact was deleted succesfully' })

};

const putContact = async (req, res) => {
    const { error } = Schema.validate(req.body);
        if (error) {
            throw HttpError(400,error.message)
    };
    
    const { contactId } = req.params;
    
    if (!req.body) {
        res.status(400).json({ "message": "missing fields" });
    }
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        res.status(404).json({"message": "Not found"})
    }
   
    res.status(200).json(result);
}

module.exports = {
    getContactById: ctrlWrapper(getContactById),
    getContacts: ctrlWrapper(getContacts),
    postContact: ctrlWrapper(postContact),deleteContact:ctrlWrapper(deleteContact), putContact:ctrlWrapper(putContact)}