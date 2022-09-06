const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
} = require('../models/contacts');

const { errorCatcherController } = require('../utils/errorCatcher');
const { wrapperFactory } = require('../utils/wrapperFactory');

const listContactsController = async (_, res) => {
    const contacts = await listContacts();
    res.status(200).json({ data: contacts });
}

const getContactByIdController = async (req, res) => {
    const found = await getContactById(req.params.contactId);

    if(!found) return res.status(404).json({ message: 'Not found' });

    res.status(200).json({ data: found });
}

const addContactContoller = async (req, res) => {
    const added = await addContact(req.body);
  
    res.status(201).json({ data: added });
}

const removeContactController = async (req, res) => {
    const removed = await removeContact(req.params.contactId);

    if(!removed) return res.status(404).json({ message: 'Not found' });

    res.status(200).json({ message: 'contact deleted', data: removed });
}

const updateContactController = async (req, res) => {
    const updated = await updateContact(req.params.contactId, req.body);

    if(!updated) return res.status(404).json({ message: 'Not found' });

    res.status(200).json({ data: updated });
}


module.exports = {
    ...wrapperFactory(
        errorCatcherController,
        listContactsController,
        getContactByIdController,
        addContactContoller,
        removeContactController,
        updateContactController
    )
}