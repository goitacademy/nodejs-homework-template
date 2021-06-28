import {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
} from '../services/contactsService.js';
import { NotAuthorizedError } from '../helpers/error.js';

const getContactsController = async (req, res, next) => {
    console.log(req.user._id);
    try {
        if (!req.user) {
            return next(
                new NotAuthorizedError('Register or login to continue'),
            );
        }
        const allContacts = await getContacts(req.user._id);
        res.status(200).json(allContacts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const owner = req.user._id;
    try {
        const contact = await getContactById(owner, contactId);
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        await deleteContact(contactId);
        res.status(200).json({
            message: `Contact with ID ${contactId} successfully deleted`,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { name, email, phone } = req.body;
    try {
        const newContact = await addContact(name, email, phone, userId);
        res.status(200).json({
            message: `Contact ${newContact._id} successfully added`,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    try {
        await updateContact(contactId, name, email, phone, userId);
        res.status(200).json({
            message: `Contact with ID '${contactId}' successfully updated`,
        });
    } catch (error) {
        res.status(400).json({
            message: `Contact with ID '${contactId}' not found`,
        });
    }
};

const updateStatusContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const newStatus = req.body;
    const { contactId } = req.params;
    try {
        await updateStatusContact(contactId, newStatus, userId);
        res.status(200).json(await getContactById(userId, contactId));
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export {
    getContactsController,
    getContactByIdController,
    deleteContactController,
    addContactController,
    updateContactController,
    updateStatusContactController,
};
