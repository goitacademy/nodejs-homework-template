const contacts = require('../models/contacts');

const {HttpError, ctrlWrapper} = require("../helpers");

const getListContacts = async (req, res) => {
    const result = await contacts.getListContacts();
    res.status(200).json(result);
};

const getContactById = async (req, res) => {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);   
};

const removeContact = async (req, res) => {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });       
};

const updateContact = async (req, res) => {
    if(Object.keys(req.body).length === 0){
        throw HttpError(400, "missing field");
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result);   
};

module.exports = {
    getListContacts: ctrlWrapper(getListContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
}
