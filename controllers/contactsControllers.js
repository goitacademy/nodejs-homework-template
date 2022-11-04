const {
    getAllContacts,
    getContactById,
    addContact,
    changeContactById,
    deleteContactById,
    updateFavoriteById,
} = require('../services/contactsService')

const {RequestError} = require("../helpers");
// const {addSchema} = require("../schemas/contacts");
const {schemas} = require("../models/contact")

const getContactsController = async (req, res) => {
    const result = await getAllContacts();
        res.status(200).json(result);
}

const getContactByIdNewController = async (req, res) => {
    const {contactId} = req.params;
        const result = await getContactById(contactId);
        res.status(200).json(result);
}

const addNewContactController = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
        const result = await addContact(req.body);
        res.status(201).json(result);
}

const editContactController = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
        const {contactId} = req.params;
        const result = await changeContactById(contactId, req.body);
        res.status(200).json(result);
}

const deleteContactController = async (req, res) => {
    const {contactId} = req.params;
        await deleteContactById(contactId);
        res.status(200).json({message: "contact deleted"});
}

const updateFavoriteByIdController = async (req, res) => {
    const {error} = schemas.updateFavoriteSchema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
    const {contactId} = req.params;
    const result = await updateFavoriteById(contactId, req.body);
    res.status(200).json(result);
}

module.exports = {
    getContactsController,
    getContactByIdNewController,
    addNewContactController,
    editContactController,
    deleteContactController,
    updateFavoriteByIdController,
}
