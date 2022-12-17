const {listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavorite,
} = require('../models');
const {RequestError} = require('../utils');

const getAllContactsController = async (req, res, next) => {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    console.log(typeof limit);
    const contacts = await listContacts({owner: _id}, skip, limit);
    res.status(200).json({contacts});
};

const getContactController = async (req, res, next) => {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
        throw RequestError(404, "Not found");
    }

    res.status(200).json({contact});
};

const postContactController = async (req, res, next) => {
    const { _id } = req.user;
    const newContact = await addContact({...req.body, owner: _id});
    res.status(201).json({newContact});
};

const deleteContactController = async (req, res, next) => {
    const contact = await removeContact(req.params.contactId);

    if (!contact) {
        throw RequestError(404, "Not found");
    }

    res.status(200).json({message: 'contact deleted'});
};

const putContactController = async (req, res, next) => {

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
        throw RequestError(404, "Not found");
    }
    res.status(200).json({updatedContact, message: 'successfully updated'});
};

const updateContactFavoriteController = async (req, res, next) => {
    const { favorite } = req.body;
    if (favorite === null || favorite === undefined) {
        throw RequestError(400, "missing field favorite");

    }
    const updatedContact = await updateContactFavorite (req.params.contactId, favorite);

    res.status(200).json({updatedContact, message: 'successfully updated'});
};

module.exports = {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    updateContactFavoriteController
};
