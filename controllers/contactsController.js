import contacts from "../models/contacts.js";
import { HttpError, controllerWrapper } from "../helpers/index.js";

const getContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

export default {
    getContacts: controllerWrapper(getContacts),
    getContact: controllerWrapper(getContact),
    addContact: controllerWrapper(addContact),
    deleteContact: controllerWrapper(deleteContact),
    updateContact: controllerWrapper(updateContact),
};
