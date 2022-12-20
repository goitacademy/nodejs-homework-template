const Contact = require('./contactShema')

const listContacts = async (owner, skip, limit, favourite) => {

        if (!favourite) {
                const contactList = await Contact.find({ ...owner}, '-createdAt -updatedAt', {skip, limit: Number(limit)}).populate('owner', '_id email');
                return contactList;
        }

        const contactList = await Contact.find({ ...owner, favourite}, '-createdAt -updatedAt', {skip, limit: Number(limit)}).populate('owner', '_id email');
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

const updateContactFavourite = async (contactId, favourite) => {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, {$set: {favourite}}, { new: true })
        return updatedContact;
}; 


module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact,
        updateContact,
        updateContactFavourite,
};
