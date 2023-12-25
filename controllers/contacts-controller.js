import * as contactsService from '../models/index.js';
import {HttpError} from '../helpers/index.js';
import {contactAddScema} from '../schemas/contact-schemas.js'
import {contactUpdateSchema} from '../schemas/contact-schemas.js';

const getListContacts = async(req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result)
    } catch(error) {
        next(error);
    }
  }

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await contactsService.getContactById(id);
        if(!result) {
            throw HttpError(404);
        }
        res.json(result);

    } catch(error) {
        next(error);
    }
  }

const addContact = async (req, res, next) => {
   try {
       const {error} = contactAddScema.validate(req.body);
    if(error) {
        throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body)
     res.status(201).json(result)
    } catch(error) {
        next(error);
    }
  }

const updateContactsById = async (req, res, next) => {
    try {
        const {error} = contactUpdateSchema.validate(req.body);
        if(error) {
            throw HttpError(400, `missing fields`)
        }
        const { id } = req.params;
        const result = await contactsService.updateContactById(id, req.body);
        if(!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);
    } catch(error) {
        next(error);
    }
  }  

const deleteContact = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if(!result) {
            throw HttpError(404, `Not found`);
        }
        res.json({ message: 'Contact deleted successfully' })
    }
    catch(error) {
        next(error);
    }
  }  

    export default {
        getListContacts,
        getById,
        addContact,
        updateContactsById,
        deleteContact,
    }