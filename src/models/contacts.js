const Contact = require('./contactShema')

const listContacts = async (owner, skip, limit) => {
        console.log(typeof limit);
        const contactList = await Contact.find({ ...owner }, '-createdAt -updatedAt', {skip, limit: Number(limit)}).populate('owner', '_id email');
        console.log(typeof limit);
        return contactList;
};

const getContactById = async (contactId) => {
        const contact = await Contact.findById(contactId, '-createdAt -updatedAt')
        return contact;
};

const removeContact = async (contactId) => {
        const contact = await Contact.findByIdAndDelete(contactId)
        return contact;
};

const addContact = async (body) => {
        const newContact = await Contact.create({...body});
        return newContact;
};

const updateContact = async (contactId, body) => {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, {$set: {...body}}, { new: true })
        return updatedContact;
};

const updateContactFavorite = async (contactId, favorite) => {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, {$set: {favorite}}, { new: true })
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
