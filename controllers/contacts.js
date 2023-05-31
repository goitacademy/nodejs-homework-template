const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../models/contacts');
const { HttpError, funcWrapper } = require('../helpers/');

const getAllContacts = async (req, res) => {
    const contacts = await listContacts();
    res.status(200).json(contacts);
};

const getContact = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact) return res.status(200).json(contact);
    throw new HttpError(404, 'not found');
};

const addNewContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    console.log('id', id);
    const contact = await removeContact(id);
    if (contact === null) throw new HttpError(404, 'not found');
    return res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        throw new HttpError(400, 'missing fields');
    }
    const updatedContact = await updateContact(id, { name, email, phone });
    if (!updatedContact) {
        throw new HttpError(404, 'not found');
    }
    res.status(200).json(updatedContact);
};

module.exports = {
    getAllContacts: funcWrapper(getAllContacts),
    getContact: funcWrapper(getContact),
    addNewContact: funcWrapper(addNewContact),
    deleteContact: funcWrapper(deleteContact),
    updateContactById: funcWrapper(updateContactById),
};
