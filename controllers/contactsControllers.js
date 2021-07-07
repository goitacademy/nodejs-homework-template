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
    if (!req.user) {
        throw new NotAuthorizedError('Register or login to continue');
    }
    const allContacts = await getContacts(req.user._id);
    res.status(200).json(allContacts);
};

const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const owner = req.user._id;
    const contact = await getContactById(owner, contactId);
    res.status(200).json(contact);
};
const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const owner = req.user._id;
    await deleteContact(owner, contactId);
    res.status(200).json({
        message: `Contact with ID ${contactId} successfully deleted`,
    });
};

const addContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone, userId);
    res.status(201).json({
        message: `Contact ${newContact._id} successfully added`,
    });
};

const updateContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    await updateContact(contactId, userId, req.body);
    res.status(200).json({
        message: `Contact with ID '${contactId}' successfully updated`,
    });
};

const updateStatusContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const { favorite } = req.body;
    await updateStatusContact(contactId, userId, favorite);
    res.status(200).json(await getContactById(userId, contactId));
};

export {
    getContactsController,
    getContactByIdController,
    deleteContactController,
    addContactController,
    updateContactController,
    updateStatusContactController,
};
