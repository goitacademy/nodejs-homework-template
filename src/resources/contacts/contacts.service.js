const {contactsModel} = require("./contacts.model");
const {NotFound} = require('http-errors')


class ContactsService {
    constructor() {
    }

    getContacts() {
        return contactsModel.findContacts()
    }

    createContact(createParams) {
        return contactsModel.insertContact(createParams)
    };

    async getContact(id) {
        return await contactsModel.findContactById(id);
    }

    async updateContact(id, updateParams) {
        return await contactsModel.updateContactById(id, updateParams)
    }

    async deleteContact(id) {
        return await contactsModel.removeById(id);
    }
}

exports.contactsService = new ContactsService()