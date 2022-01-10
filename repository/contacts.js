import Contact from "../models/contact/contact";

const listContacts = async ({sortBy, sortByDesc, filter, limit=10, skip=0}) => {
    let sortCriterion = null
    const total = await Contact.find().countDocuments()
    let result = Contact.find()
    if (sortBy) {
        sortCriterion = {[`${sortBy}`]: 1}
    }
    if (sortByDesc) {
        sortCriterion = {[`${sortByDesc}`]: -1}
    }
    if (filter) {
        result = result.select(filter.split('::').join(' '))
    }
    result = await result.skip(Number(skip)).limit(Number(limit)).sort(sortCriterion)
    return {total, contacts: result}
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
