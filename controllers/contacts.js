const contacts = require("../models/contacts");
const { HttpError } = require("../helpers")

const {ctrlWrapper} = require("../helpers")


const getAll = async (req, res, next) => {
        const contactList = await contacts.listContacts();
        res.json(contactList);
};

const getByID = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await contacts.getContactById(contactId);
        if (!contact) {
            throw HttpError(404, 'Not Found');
        }
        res.json(contact);
};

const postContact = async (req, res, next) => {
        const newContact = await contacts.addContact(req.body);
        res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);

        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.json({ message: 'Contact deleted' });
};

const putContact = async (req, res) => {
        const { contactId } = req.params;
        const { body } = req;
        const updatedContact = await contacts.updateContact(contactId, body);
        if (updatedContact) {
            res.json(updatedContact);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
};


module.exports = {
    getAll: ctrlWrapper(getAll),
    getByID: ctrlWrapper(getByID),
    postContact: ctrlWrapper(postContact),
    deleteContact: ctrlWrapper(deleteContact),
    putContact: ctrlWrapper(putContact),
}