const fs = require("fs").promises
const path = require("path")
const Contact = require('../Contact')
class ContactsService {
    constructor() { }

    async create(contact) {
        const createdContact = await Contact.create(contact)
        return createdContact
    }
    async getAll() {
        const contacts = await Contact.find()
        console.log('contacts', contacts);
        return contacts
    }
    async getById(id) {
        if (!id) {
            throw new Error("id is not specified")
        }
        const contact = await Contact.findById(id)
        return contact
    }
    async remove(id) {
        if (!id) {
            throw new Error("id is not specified")
        }
        await Contact.findByIdAndDelete(id)
        const contacts = await Contact.find()
        return contacts
    }
    async update(id, contact) {
        if (!id) {
            throw new Error("id is not specified")
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, contact, {new: true})
        return updatedContact
    }
    async updateStatus(id, updateBody) {
        if (!id) {
            throw new Error("id is not specified")
        }
        console.log(updateBody);
        const filter = { _id: id }
        const updatedContact = Contact.findOneAndUpdate(filter, updateBody, { new: true })
        return updatedContact
    }
}

module.exports = new ContactsService();