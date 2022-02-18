const {Schema, model} = require('mongoose');

const contactsShema = new Schema({
    "name": {
        "type": String,
        "required": [true, 'Set name for contact'],
    },
    "email": {
        "type": String,
    },
    "phone": {
        "type": String,
    },
    "favorite": {
        "type": Boolean,
        "default": false,
    }
})

const contactsModel = model("Contact", contactsShema)
exports.contactsModel = contactsModel



























// const shortid = require('shortid')
//
//
// const path = require('path');
// const fs = require('fs').promises
// const contactsPath = path.join(__dirname, '../../models/contacts.json');
//
// class ContactsModel {
//
//     async findContacts() {
//         const data = await fs.readFile(contactsPath);
//         return JSON.parse(data)
//     }
//
//     async insertContact(createParams) {
//         const id = shortid.generate();
//         const contact = {id: id, ...createParams};
//
//         const contacts = await this.findContacts();
//         contacts.push(contact)
//         await fs.writeFile(contactsPath, JSON.stringify(contacts))
//
//         return contact
//     };
//
//
//     async findContactById(id) {
//         const contacts = await this.findContacts()
//         return contacts.find(contact => contact.id === id)
//     }
//
//     async getContactIndex(id) {
//         const contacts = await this.findContacts()
//         return contacts.indexOf(contacts.find(cont => cont.id === id))
//     }
//
//     async updateContactById(id, updateParams) {
//         let contacts = await this.findContacts()
//
//         const contactIndex = await this.getContactIndex(id)
//         if (contactIndex === -1) return false
//
//         const updateContact = {...contacts[contactIndex], ...updateParams}
//         contacts[contactIndex] = updateContact
//         await fs.writeFile(contactsPath, JSON.stringify(contacts))
//
//         return updateContact
//     }
//
//     async removeById(id) {
//         let contacts = await this.findContacts()
//
//         const contactIndex = await this.getContactIndex(id)
//         if (contactIndex === -1) return false;
//
//         contacts.splice(contactIndex, 1);
//         await fs.writeFile(contactsPath, JSON.stringify(contacts))
//         return true;
//     }
//
// }
//
// exports.contactsModel = new ContactsModel()