const { Contact } = require('../models')

const getAllContacts = async () => {
    return Contact.find()
}

const getContactById = (id) => {
    return Contact.findOne({ _id: id })
}

const createContact = (body) => {
    return Contact.create(body)
}

const updateContact = (id, body) => {
    return Contact.findByIdAndUpdate({ _id: id }, body)
}

const updateFavorite = (id, body) => {
    return Contact.findByIdAndUpdate({ _id: id }, body)
}

const removeContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    updateFavorite,
    removeContact,
}