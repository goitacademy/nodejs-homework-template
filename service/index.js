const Contact = require('./schemas/contact')

async function listContacts() {
    return Contact.find()
}

async function getContactById(contactId) {
    return Contact.findOne({ _id: contactId })
}

async function removeContact(contactId) {
    return Contact.findByIdAndRemove({ _id: contactId })
}

async function addContact(body) {
    return Contact.create(body)
}

async function updateContact(contactId, body) {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}