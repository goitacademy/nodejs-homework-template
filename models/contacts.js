const Contact = require('../services/conctacts')

const listContacts = async (userId) => {
    try {
        return await Contact.find({ owner: userId })
    } catch (err) {
        console.log('Error getting contact list: ', err)
        throw err
    }
}

const getContactById = async (contactId) => {
    try {
        return await Contact.findById(contactId)
    } catch (err) {
        console.log('Error getting contact by ID: ', err)
        throw err
    }
}

const removeContact = async (contactId) => {
    try {
        return await Contact.findByIdAndRemove(contactId)
    } catch (err) {
        console.log('Error removing contact: ', err)
        throw err
    }
}

const addContact = async (body) => {
    try {
        const newContact = new Contact(body)
        return await newContact.save()
    } catch (err) {
        console.log('Error adding new contact: ', err)
        throw err
    }
}

const updateContact = async (contactId, body) => {
    try {
        return await Contact.findByIdAndUpdate(contactId, body, { new: true })
    } catch (err) {
        console.log('Error updating contact: ', err)
        throw err
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
