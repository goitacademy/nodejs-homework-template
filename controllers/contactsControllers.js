import {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
} from '../services/contactsService.js';

const getContactsController = async (req, res, next) => {
    try {
        const allContacts = await getContacts();
        res.status(200).json(allContacts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await getContactById(contactId);
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
    const formData = req.body;
    try {
        const newContact = await addContact(formData);
        res.status(200).json({
            message: `Contact ${newContact._id} successfully added`,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateContactController = async (req, res, next) => {
    const formData = req.body;
    const { contactId } = req.params;
    try {
        await updateContact(contactId, formData);
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
    const newStatus = req.body;
    const { contactId } = req.params;
    try {
        await updateStatusContact(contactId, newStatus);
        res.status(200).json(await getContactById(contactId));
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
