const Contact = require('../services/contactMongoose') // dostosuj ścieżkę do lokalizacji pliku modelu

const listContacts = async () => {
    try {
        return await Contact.find()
    } catch (err) {
        console.log('Error getting contact list: ', err)
        throw err
    }
}
const getContactById = async (contactId) => {
    return await Contact.findById(contactId)
}

const removeContact = async (contactId) => {
    return await Contact.findByIdAndDelete(contactId)
}

const addContact = async (body) => {
    return await Contact.create(body)
}

const updateContact = async (contactId, body) => {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true })
}

const updateStatusContact = async (contactId, body) => {
    return await Contact.findByIdAndUpdate(
        contactId,
        { favorite: body.favorite },
        { new: true }
    )
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
}
