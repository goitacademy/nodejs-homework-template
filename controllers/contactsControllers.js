const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
} = require('../models/contacts');

const { BadRequestError } = require('../models/errors');
const { errorHandlerController } = require('../utils/errorHandler');
const { wrapperFactory } = require('../utils/wrapperFactory');

const listContactsController = async (_, res) => {
    const contacts = await listContacts();

    res
        .status(200)
        .json({ data: contacts });
}

const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const found = await getContactById(contactId);

    if(!found) {
        return next(
            new BadRequestError(generateMessage(contactId))
        );
    }

    res.status(200).json({ data: found });
}

const addContactContoller = async (req, res) => {
    const added = await addContact(req.body);
  
    res
        .status(201)
        .json({ data: added });
}

const removeContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const removed = await removeContact(contactId);

    if(!removed) {
        return next(
            new BadRequestError(generateMessage(contactId))
        );
    }

    res
        .status(200)
        .json({ message: 'contact deleted', data: removed });
}

const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const updated = await updateContact(contactId, req.body);

    if(!updated) {
        return next(
            new BadRequestError(generateMessage(contactId))
        );
    }

    res
        .status(200)
        .json({ data: updated });
}

function generateMessage(value) {
    return `Contact with id ${value} is not found`;
}

module.exports = {
    ...wrapperFactory(
        errorHandlerController,
        listContactsController,
        getContactByIdController,
        addContactContoller,
        removeContactController,
        updateContactController
    )
}