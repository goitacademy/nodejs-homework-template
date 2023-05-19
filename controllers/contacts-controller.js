const { add, getById, list, remove, update } = require('../models/contacts');
const { validateContact } = require('../helpers');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const getAllContacts = async (_, res) => {
    const contacts = await list();
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const searchedContact = await getById(contactId);
    validateContact(searchedContact);
    res.json(searchedContact);
};

const addContact = async (req, res) => {
    const newContact = await add(req.body);
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await update(contactId, req.body);
    validateContact(updatedContact);
    res.json(updatedContact);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await remove(contactId);
    validateContact(deletedContact);
    res.status(204).send();
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    deleteContact: ctrlWrapper(deleteContact),
};
