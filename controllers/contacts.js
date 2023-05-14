const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../models/contacts');
const { HttpError, ctrlrWrapper } = require('../helpers');
const shortid = require('shortid');

const getAll = async (_, res) => {
    const contactsList = await listContacts();
    if (!Object.keys(contactsList)) throw HttpError(404, 'Not found'); 
    res.json(contactsList);
}

const getById = async (req, res) => {
    const contactsList = await listContacts();
    if (!Object.keys(contactsList)) throw HttpError(404, 'Not found');
    const contact = await getContactById(contactsList, req.params.contactId);
    if (!contact) throw HttpError(404, 'Not found'); 
    res.json(contact);
    return contact;
}

const add = async (req, res) => {
    req.body.id = shortid.generate();
    const contactsList = await listContacts();
    await addContact(contactsList, req.body);
    res.status(201).json(req.body);
}

const deleteById = async (req, res) => {
    const contactsList = await listContacts();
    const contact = await getContactById(contactsList, req.params.contactId);
    if (contact === null) throw HttpError(404, 'Not found');
    await removeContact(contactsList, req.params.contactId);
    res.status(200).json({ message: `contact deleted` });
}

const updateById = async (req, res) => {
    const contactsList = await listContacts();
    const contact = await getContactById(contactsList, req.params.contactId);
    if (contact === null) throw HttpError(404, 'Not found');
    const updatedContact = await updateContact(contactsList, req.params.contactId, req.body);
    res.status(200).json(updatedContact);
}

module.exports = {
    getAll: ctrlrWrapper(getAll),
    getById: ctrlrWrapper(getById),
    add: ctrlrWrapper(add),
    deleteById: ctrlrWrapper(deleteById),
    updateById: ctrlrWrapper(updateById)
}