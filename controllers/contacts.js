const contacts = require("../models/contacts");
const { HttpError,ctrlWrapper } = require("../helpers/index");


const listContacts = async (req, res) => {

    const result = await contacts.listContacts();
    res.json(result);
    
};

const getContactById = async (req, res) => {
   
    const result = await contacts.getContactById(req.params.contactId);
    
    if (!result) {
        throw HttpError(404, "Contact not found");
    }

    res.json(result);
    
};

const addContact = async (req, res) => {
   
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
   
};

const updateContact = async (req, res) => {
   
    const { contactId } = req.params;
    
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
        throw HttpError(404, "Contact not found");
    }

    res.json(result);
   
};

const removeContact = async (req, res) => {
   
    const { contactId } = req.params;
    
    const result = await contacts.removeContact(contactId);

    if (!result) {
        throw HttpError(404, "Contact not found");
    }
    res.json({
        message: "Delete success"
    });
   
};


module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
};