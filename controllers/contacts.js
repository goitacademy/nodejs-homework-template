const { NotFound } = require('http-errors');
const contactsOperations = require('../model/contacts');
const { sendSuccessfulRes } = require('../helpers');


const listContacts = async (req, res) => {
    const result = await contactsOperations.listContacts();
    sendSuccessfulRes(res, { result });
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

const addContact = async (req, res) => {
    const result = await contactsOperations.addContact(req.body);
    sendSuccessfulRes(res, { result }, 201);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = contactsOperations.removeContact(contactId);
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { message: `Contact with ${contactId} id was deleted.` });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
}
