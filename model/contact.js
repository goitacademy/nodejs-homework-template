const Contact = require('../model/schemas/contact.js')

const list = async (userId) => {
    return await Contact.find({ owner: userId }).populate({
        path: 'owner',
        select: 'name, sex, email-_id'
    })
}

const findById = async (id, userId) => {
    return await Contact.findOne({ _id: id, owner: userId }).populate({
        path: 'owner',
        select: 'name, sex, email-_id'
    })
}

const remove = async (id, userId) => {
    const contact = await Contact.findOneAndRemove({ _id: id, owner: userId })
    if (contact) {
        return contact
    } else {
        throw new Error('Contact not found')
    }
}

const create = async (body) => {
    return await Contact.create(body)
}

const update = async (contactId, body, userId) => {
    return await Contact
        .findOneAndUpdate(
            { _id: contactId, owner: userId },
            { ...body },
            { new: true }
        )
}

module.exports = {
    list,
    findById,
    remove,
    create,
    update,
}