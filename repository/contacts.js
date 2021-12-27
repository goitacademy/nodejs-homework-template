import Contact from "../models/contacts/contact";

const listContacts = async () => {
    const result = await Contact.find()
    return result
}

const getContactById = async (contactId) => {
    const result = Contact.findById(contactId)
    return result
}

const removeContact = async (contactId) => {
    const result = Contact.findByIdAndRemove(contactId)
    return result
}

const addContact = async (body) => {
    const result = Contact.create(body)
    return result
}

const updateContact = async (contactId, body) => {
    const result = Contact.findByIdAndUpdate
    (contactId, {...body}, {new: true})
    return result
}

export default {listContacts, getContactById, removeContact, addContact, updateContact}
