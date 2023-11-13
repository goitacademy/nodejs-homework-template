const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../models/contacts.js');
const { createContactValidationSchema, updateContactValidationSchema } = require('../utils/validation/contactValidationSchemes');
const { HttpError } = require('../utils/validation/HttpErrors.js');

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts)
    }
    catch(error) {
        next(error)
    }
};

const getOneContact = async (req, res, next) => {
    try{
        const { contactId } = req.params;  
        const contact = await getContactById(contactId);
        if (!contact) {
            throw HttpError(404, 'Not found');
        }
        res.status(200).json(contact);
    }
    catch(error) {
       next(error)
    }

};

const createContact = async (req, res, next) => {
    try {
        const { error } = createContactValidationSchema.validate(req.body);
        if (error) {
           throw HttpError(400, error.message);
        }
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    }
    catch(error) {
       next(error)
    }
};

const upContact = async (req, res, next) => {
    try{
        const { error } = updateContactValidationSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        } 
        const { contactId } = req.params;
        const updateCont = await updateContact(contactId, req.body);
        if (!updateCont) {
                throw HttpError(404, `No found`);
            }
        res.status(200).json(updateCont);
    }
    catch(error) {
       next(error)
    }
};

const deleteContact = async (req, res,next) => {
    try {
        const { contactId } = req.params;  
        const contact = await removeContact(contactId);
        if (!contact) {
            throw HttpError(404, `No found`);
        }
        
        res.json({ 
            message: "contact deleted"
        });
    }
    catch(error) {
        next(error)
    }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  upContact,
  deleteContact,
};
