const Contacts = require('./schemas/contacts')

const getAllContacts = async () => {
    return Contacts.find()
}

const getContactsById = async (id) => {
    return Contacts.findOne({ _id: id })
}

const createContacts = async (fields) => {
    return Contacts.create(fields)
}

const updateContacts = async (id, fields) => {
    return Contacts.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContacts = async (id) => {
    return Contacts.findByIdAndRemove({ _id: id })
}

const updateStatusContact = async (id, fields) => {
    return Contacts.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

module.exports = {
    getAllContacts,
    getContactsById,
    createContacts,
    updateContacts,
    removeContacts,
    updateStatusContact
}
