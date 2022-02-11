const shortid = require('shortid')

// const contacts = [
//     {
//         id: "NA4t_Ldoo",
//         username: "test1",
//         email: "test1@gmail.com"
//     },
//     {
//         "id": "u7uYG3vSp",
//         "username": "test1",
//         "email": "test1@gmail.com"
//     },
//     {
//         "id": "St7iLg5ko",
//         "username": "test1",
//         "email": "test1@gmail.com"
//     },
//     {
//         "id": "QZTnQlLxNg",
//         "username": "test1",
//         "email": "test1@gmail.com"
//     },
//     {
//         "id": "YWCmJU-2X",
//         "username": "test1",
//         "email": "test1@gmail.com"
//     }
// ]

const path = require('path');
const fs = require('fs').promises
const contactsPath = path.join(__dirname, '../../models/contacts.json');

class ContactsModel {
    constructor() {

    }

    async findContacts() {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data)
    }

    async insertContact(createParams) {
        const id = shortid.generate();
        const contact = {id: id, ...createParams};

        const contacts = await this.findContacts();
        contacts.push(contact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts))

        return contact
    };


    async findContactById(id) {
        const contacts = await this.findContacts()
        return contacts.find(contact => contact.id === id)
    }

    async getContactIndex(id) {
        const contacts = await this.findContacts()
        return contacts.indexOf(contacts.find(cont => cont.id === id))
    }

    async updateContactById(id, updateParams) {
        let contacts = await this.findContacts()

        const contactIndex = await this.getContactIndex(id)
        if (contactIndex === -1) return false

        const updateContact = {...contacts[contactIndex], ...updateParams}
        contacts[contactIndex] = updateContact
        await fs.writeFile(contactsPath, JSON.stringify(contacts))

        return updateContact
    }

    async removeById(id) {
        let contacts = await this.findContacts()

        const contactIndex = await this.getContactIndex(id)
        if (contactIndex === -1) return false;

        contacts.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts))
        return true;
    }

}

exports.contactsModel = new ContactsModel()