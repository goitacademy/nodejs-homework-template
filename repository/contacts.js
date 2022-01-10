import Contact from "../models/contact/contact";

const listContacts = async (userId, {sortBy, sortByDesc, filter, limit=10, skip=0}) => {
    let sortCriterion = null
    const total = await Contact.find({owner: userId}).countDocuments()
    let result = Contact.find({owner: userId}).populate({path: 'owner', select: 'name email age subscription'})
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

const getContactById = async (userId, contactId) => {
    const result = Contact.findOne({_id: contactId, owner: userId}).populate({path: 'owner', select: 'name email age subscription'})
    return result
}

const removeContact = async (userId,contactId) => {
    const result = Contact.findOneAndRemove({_id: contactId, owner: userId})
    return result
}

const addContact = async (userId, body) => {
    const result = Contact.create({...body, owner: userId})
    return result
}

const updateContact = async (userId, contactId, body) => {
    const result = Contact.findOneAndUpdate
    ({_id: contactId, owner: userId}, {...body}, {new: true})
    return result
}

export default {listContacts, getContactById, removeContact, addContact, updateContact}
