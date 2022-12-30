const { Contact } = require('../db/contactModel')
// const { WrongContactIdError } = require('../../helpers/errors')

const getContacts = async () => {
    const contacts = await Contact.find({})
    return contacts;
}
const getContactById = async (id) => {
    const contact = await Contact.findById(id)
    if (!contact) {
        return res.sendStatus(404)
    }
    return contact
}
const addContact = async ({name, email, phone, favorite}) => {
    const contact = new Contact({ name, email, phone, favorite })
    await contact.save()
    return contact
}
const removeContact = async (id) => {
    const contact = await Contact.findByIdAndRemove(id)
    if (!contact) {
        return res.sendStatus(404)
    }
}
const updateContact = async (id, body) => {
    const contactUpdate = await Contact.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true }) 
    return contactUpdate
}
const updateStatusContact = async (id, favorite) => {
    const contactUpdateStatus = await Contact.findByIdAndUpdate(
        id,
        favorite,
        { new: true })
    return contactUpdateStatus
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}