const Contact = require('./schemas/contact')

const getListContacts = async () => {
    return Contact.find()
}

const getContactById = (id) => {
    return Contact.findOne({ _id: id })
}

const addContact = ({ title, text }) => {
    return Contact.create({ title, text })
}

const updateContact = (id, fields) => {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
    getListContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
}
