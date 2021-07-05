import Contact from '../db/contactsModel.js';
import { WrongParametersError, NotAuthorizedError } from '../helpers/error.js';

const getContacts = async userId => {
    return await Contact.find({ owner: userId }, { __v: 0 });
};

const getContactById = async (userId, contactId) => {
    return await Contact.find(
        {
            $and: [{ _id: contactId }, { owner: userId }],
        },
        { __v: 0 },
    );
};

const deleteContact = async (userId, contactId) => {
    await Contact.findOneAndRemove({
        _id: contactId,
        owner: userId,
    });
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

const updateContact = async (contactId, userId, body) => {
    const response = await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        { $set: { ...body } },
    );
    if (!response) {
        throw new NotAuthorizedError('Not authorized!');
    }
    return response;
};

const updateStatusContact = async (contactId, userId, favorite) => {
    const response = await Contact.findOneAndUpdate(
        { _id: contactId, owner: userId },
        { $set: { favorite } },
    );

    if (!response) {
        throw new NotAuthorizedError('Not authorized!');
    }
    return response;
};

export {
    getContacts,
    getContactById,
    deleteContact,
    addContact,
    updateContact,
    updateStatusContact,
};
