import {
    getContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    changeContact,
} from '../services/contactsService.js';

const getContactsController = async () => {
    try {
        return await getContacts();
    } catch (error) {
        console.log(error.message);
    }
};

const getContactsByIdController = async contactId => {
    try {
        return; //listawait getContactById(contactId)
    } catch (error) {
        console.log(error.message);
    }
};
const deleteContactController = async contactId => {
    try {
        await deleteContact(contactId);
    } catch (error) {
        console.log(error.message);
    }
};

const addContactController = async ({ name, email, phone }) => {
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
        });
        await newContact.save();
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

const updateContactController = async(contacId, { name, email, phone });
