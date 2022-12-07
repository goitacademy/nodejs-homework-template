// const fs = require('fs/promises');
const { default: mongoose } = require('mongoose');
// const path = require('path');
// const {v4: uuidv4} = require('uuid');

// const contactsPath = path.join(__dirname, './contacts.json');

const contactsSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, 'Set name for contact'],
        },
        email: {
                type: String,
        },
        phone: {
                type: String,
        },
        favorite: {
                type: Boolean,
                default: false,
        },
});

const contacts = mongoose.model('contacts', contactsSchema)

const listContacts = async () => {
        const contactList = await contacts.find();
        return contactList;
};

const getContactById = async (contactId) => {
        const contact = await contacts.findById(contactId)
        return contact;
};

const removeContact = async (contactId) => {
        const contact = await contacts.findByIdAndDelete(contactId)
        return contact;
};


const addContact = async (body) => {
        const {name, email, phone} = body;
        const newContact = await contacts.create({ name, email, phone });
        return newContact;
};

const updateContact = async (contactId, body) => {
        const updatedContact = await contacts.findByIdAndUpdate(contactId, {$set: {...body}})
        return updatedContact;
};

const updateContactFavorite = async (contactId, body) => {
        const { favorite } = body;
        const updatedContact = await contacts.findByIdAndUpdate(contactId, {$set: {favorite}})
        return updatedContact;
}; 

module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact,
        updateContact,
        updateContactFavorite
};
