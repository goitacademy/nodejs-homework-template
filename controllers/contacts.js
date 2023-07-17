
const Joi = require('joi');

const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers')


const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})


const listAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
}


const getContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    
    if (!result) { 
      throw HttpError(404, "Not found" );
    }

    res.status(200).json(result);
}


const addContact = async (req, res) => {


    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing required field")
    }
    console.log("check req.body", req.body)
    
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}
    
const updateContact = async (req, res) => {

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields")
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

     if (!result) { 
       throw HttpError(404, "Not found");
    }

    res.json(result);
} 
    
const removeContact = async (req, res) => {

    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)

    if (!result) { 
      throw HttpError(404, "Not found" );
    }

    res.status(200).json({ "message": 'contact deleted' })
}


module.exports = {
    listAll: ctrlWrapper(listAll),
    getContact: ctrlWrapper(getContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
}