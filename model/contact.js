const Contact = require('../model/schemas/contact.js')

const list = async () => {
    return await Contact.find({})
}

const findById = async (id) => {
    return await Contact.findOne({ _id: id })
}

const remove = async (id) => {
    const contact = await Contact.findOneAndRemove({ _id: id })
    if (contact) {
        return contact
    } else {
        throw new Error('Contact not found')
    }
}

const create = async (body) => {
    return await Contact.create(body)
}

const update = async (contactId, body) => {
    return await Contact
        .findOneAndUpdate(
            contactId,
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