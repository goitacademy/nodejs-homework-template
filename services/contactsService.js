import Contact from '../db/contactsModel.js';
import { NotAuthorizedError } from '../helpers/error.js';

const getContacts = async userId => {
    return await Contact.find({ owner: userId });
};

const getContactById = async (userId, contactId) => {
    if (!userId) {
        throw new NotAuthorizedError('Not authorized');
    }
    return await Contact.findOne({ owner: userId, _id: contactId });
};

const deleteContact = async contactId => {
    await Contact.findByIdAndRemove(contactId);
};

const addContact = async (name, email, phone, userId) => {
    const newContact = new Contact({
        name,
        email,
        phone,
        owner: userId,
    });
    await newContact.save();
    return newContact;
};

const updateContact = async (contactId, name, email, phone, userId) => {
    const contact = await getContactById(userId, contactId);
    const contactUpdate = {
        name: name || contact.name,
        email: email || contact.email,
        phone: phone || contact.phone,
    };
    await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        { $set: contactUpdate },
    );
};

const updateStatusContact = async (contactId, newStatus, userId) => {
    await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        { $set: newStatus },
    );
};

export {
    getContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
    updateStatusContact,
};
