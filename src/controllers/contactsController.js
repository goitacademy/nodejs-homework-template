const {listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../models/contacts');

const getAllContacts = async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json({contacts, status: 200});
};

const getOneContactById = async (req, res, next) => {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
        res.status(404).json({'message': 'Not found', 'status': 404});
        return;
    }

    res.status(200).json({contact, status: 200});
};

const postContact = async (req, res, next) => {
    const newContact = await addContact(req.body);
    res.status(201).json({newContact, status: 201});
};

const deleteContact = async (req, res, next) => {
    const contact = await removeContact(req.params.contactId);

    if (!contact) {
        res.status(404).json({'message': 'Not found', 'status': 404});
        return;
    }

    res.status(200).json({'message': 'contact deleted', 'status': 200});
};

const putContact = async (req, res, next) => {
    // const {name, email, phone} = req.body;

    // if (!name && !email && !phone) {
    //     res.status(400).json({'message': 'missing fields', 'status': 400});
    //     return;
    // }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
        res.status(404).json({'message': 'Not found'});
        return;
    }
    res.status(200).json({updatedContact, message: 'successfully updated'});
};

module.exports = {
    getAllContacts,
    getOneContactById,
    postContact,
    deleteContact,
    putContact,
};
