import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import contacts from "../models/contacts.js";

const getAllContacts = async (req, res) => {
    const result = await contacts.listContacts();
    if (!result) {
        throw HttpError(404, 'Not found')
    }
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

const removeContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({ message: 'contact deleted' });
};

const createContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContactById: ctrlWrapper(removeContactById),
    createContact: ctrlWrapper(createContact),
    updateContactById: ctrlWrapper(updateContactById),
}