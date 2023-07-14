const Joi = require('joi');

const { listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact, } = require('../models/contacts');

const { HttpError } = require('../utils/HttpError');

const ctrlWrapper = require('../utils/ctrlWrapper');

const validateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email(),
  phone: Joi.number().positive().integer().required()
})

const getContactList = async (req, res) => {
        const contactList = await listContacts();
        res.json(contactList)
};

const getOneContact = async (req, res) => {
        const { contactId } = req.params;
    
        const foundContact = await getContactById(contactId);
        if (!foundContact) {
            throw HttpError(404, 'Contact not found, make sure the id is valid');
    }
    
        res.json(foundContact);
};

const addNewContact = async (req, res) => {
        const body = req.body;

        const { error } = validateSchema.validate(body)
        if (error) {
            throw HttpError(400, error.message)
        }

        await addContact(body);

        res.status(201).json({
            message: `New contact '${body.name}' successfuly added to your contacts`
        });
};

const deleteContact = async (req, res) => {
        const { contactId } = req.params;
    
        const removedContact = await removeContact(contactId);
        if (!removedContact) {
            throw HttpError(404, 'Contact not found or already have been deleted, make sure the id is valid');
    }
    
        res.json({
            message: `Delete contact success`
        });
};

const updateContactById = async (req, res) => {
         const body = req.body;
         const { contactId } = req.params;
    
        const { error } = validateSchema.validate(body)
        if (error) {
            throw HttpError(400, error.message)
        };

        const result = await updateContact(contactId, body);

        if (!result) {
            throw HttpError(404, 'Contact not found, make sure the id is valid')
        }

        res.json({
            message: `Contact: '${body.name}' with id: '${contactId}' successfuly updated`
        })   
};

module.exports = { 
    getContactList: ctrlWrapper(getContactList),
    getOneContact: ctrlWrapper(getOneContact),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContactById: ctrlWrapper(updateContactById),
}