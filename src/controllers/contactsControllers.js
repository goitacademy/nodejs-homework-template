const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../models/contacts');

const contactsList = async (req, res, next) => {
    const data = await listContacts();

    return res.status(200).json(data);
};

const getOneContactById = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    if (!contact) {
        return res.status(404).json({ "message": "Not found" });;
    }
    return res.status(200).json(contact);
};

const addOneContact = async (req, res, next) => {
    const newContact = await addContact(req.body);
    return res.status(201).json({ newContact });
}

const removeContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
        return res.status(404).json({ "message": "Not found" });
    }

    return res.status(200).json({ "message": "contact deleted" });
}

const updateContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const changedContact = await updateContact(contactId, req.body);

    if (!changedContact) {
        return res.status(404).json({ "message": "not found" });
    }

    return res.status(200).json(changedContact);
};

module.exports = {
    contactsList,
    getOneContactById,
    removeContactById,
    addOneContact,
    updateContactById
}