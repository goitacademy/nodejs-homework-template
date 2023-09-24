const Contact = require('./schemas/schemaMongoose');

const getAllContacts = async () => {
    return Contact.find()
}

const getContactById = (contactId) => {
    return Contact.findOne({ _id: contactId })
}

const createContact = (body) => {
    return Contact.create(body)
}

const updateContact = (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}

const removeContact = (contactId) => {
    return Contact.findByIdAndRemove({ _id: contactId })
}

const updateStatusContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
    updateStatusContact
}
