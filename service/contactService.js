const { Types } = require('mongoose');
const { Contact } = require('./models/contactModel');
const { HttpError } = require('../helpers');

const listContacts = async(query, owner) => {
    const findQuery = {owner};
    if (query.favorite) findQuery.favorite = query.favorite;
    if (query.search) findQuery[`${query.field || 'name'}`] = { $regex: query.search, $options: 'i' };

    const paginationLimit = Number(query.limit) ?? 10;
    const paginationPage = Number(query.page) ?? 1;

    const contacts = await Contact.find(findQuery)
        .sort(`${query.order === 'DESC' ? '-' : ''}${query.sort || 'name'}`)
        .limit(paginationLimit)
        .skip((paginationPage - 1) * paginationLimit);
        const total = await Contact.countDocuments(findQuery);
    return { contacts, total };
};

const addContact = (body, owner) => Contact.create({...body,owner});

const getContactById = contactId => Contact.findById(contactId);

const removeContact = contactId => Contact.findByIdAndDelete(contactId);

const updateContact = (contactId, body) =>
    Contact.findByIdAndUpdate(contactId, body, { new: true });

const updateStatusContact = (contactId, body) =>
    Contact.findByIdAndUpdate(contactId, body, { new: true });

const checkContactExistById = async (id, owner) => {
    const idIsValid = Types.ObjectId.isValid(id);
    if (!idIsValid) throw new HttpError(404);
    const isContactExist = await Contact.exists({ _id: id, owner });
    if (!isContactExist) throw new HttpError(404);
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    checkContactExistById,
};
