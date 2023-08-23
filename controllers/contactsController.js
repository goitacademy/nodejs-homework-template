import Contact from "../models/contact.js";
import { HttpError, controllerWrapper } from "../helpers/index.js";

const getContacts = async (req, res, next) => {
    const result = await Contact.find();
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.getContactById(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
    const result = await Contact.addContact(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.updateContact(contactId, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;

        if (typeof favorite !== 'boolean') {
            return res.status(400).json({ message: 'missing field favorite' });
        }

        const updatedContact = await Contact.updateContact(contactId, { favorite });

        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};
    


export default {
  getContacts: controllerWrapper(getContacts),
  getContact: controllerWrapper(getContact),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
