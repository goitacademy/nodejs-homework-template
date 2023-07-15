import contactService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import {ctrlWrapper} from '../decorators/index.js';

const getAll = async (req, res) => {
    const result = await contactService.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.json(result);
};

const add = async (req, res) => {
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.status(200).json({ message: "Contact deleted" })
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactService.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${contactId} not found`)
    }
    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
};