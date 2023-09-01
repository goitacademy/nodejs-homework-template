import Contact from "../models/contact.js";
import { HttpError, controllerWrapper } from "../helpers/index.js";

const getContacts = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find(owner, "-createdAt -updatedAt",{skip, limit}).populate();
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
    const {_id: owner} = req.user;
    const result = await Contact.addContact(...req.body, owner);
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
            throw HttpError(404, "Not found");
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
