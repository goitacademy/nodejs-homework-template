const contacts = require("../models/contacts");

const {HttpError, ctrlWrapper} = require('../helpers');

const getAllContacts = async(req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async(req, res, next) => {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const addNewContact = async(req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const updateContactById = async(req, res) => {
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const deleteContactById = async(req, res) => {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json({
        message:"Delete success"
    })
}


module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
};