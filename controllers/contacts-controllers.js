const contacts = require('../models/contacts')
const { HttpError } = require('../helpers')
const {controllersWrapper} = require('../decorators')

const getAllContacts = async (req, res, next) => {
    const result = await contacts.listContacts()
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.json(result)
}

const addNewContact = async (req, res, next) => {
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
}
  
const removeContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.status(200).json({"message": "contact deleted"})
}

const updateContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body) 
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.json(result)
}
    
module.exports = {
    getAllContacts: controllersWrapper(getAllContacts),
    getContactById: controllersWrapper(getContactById),
    addNewContact: controllersWrapper(addNewContact),
    removeContactById: controllersWrapper(removeContactById),
    updateContactById: controllersWrapper(updateContactById),
}