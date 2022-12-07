const {listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavorite,
} = require('../models/contacts');

const getAllContactsController = async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json({contacts, status: 200});
};

const getContactController = async (req, res, next) => {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
        res.status(404).json({'message': 'Not found', 'status': 404});
        return;
    }

    res.status(200).json({contact, status: 200});
};

const postContactController = async (req, res, next) => {
    const newContact = await addContact(req.body);
    res.status(201).json({newContact, status: 201});
};

const deleteContactController = async (req, res, next) => {
    const contact = await removeContact(req.params.contactId);

    if (!contact) {
        res.status(404).json({'message': 'Not found', 'status': 404});
        return;
    }

    res.status(200).json({'message': 'contact deleted', 'status': 200});
};

const putContactController = async (req, res, next) => {

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
        res.status(404).json({'message': 'Not found'});
        return;
    }
    res.status(200).json({updatedContact, message: 'successfully updated'});
};

const patchContactController = async (req, res, next) => {

    const updatedContact = await updateContactFavorite (req.params.contactId, req.body);
    if (!updatedContact) {
        res.status(404).json({'message': 'Not found'});
        return;
    }
    res.status(200).json({updatedContact, message: 'successfully updated'});
};

module.exports = {
    getAllContactsController,
    getContactController,
    postContactController,
    deleteContactController,
    putContactController,
    patchContactController
};
