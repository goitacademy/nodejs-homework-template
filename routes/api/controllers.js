const {contact} = require('../../models/contacts.js')

class ContactsController{
     async listContacts ()  {
         const contacts = await contact.find();
        return contacts
    }

    async getContactById (contactId)  {
        if(!contactId){
            throw new Error('id is not defined')
        }
        const thisContact = await contact.findById(contactId);
        return thisContact;
    }

    async addContact (body) {
        const newContact = await contact.create(body);
        return newContact;
     }

    async updateContact (contactId, body) {
        const updatedContact = await contact.findByIdAndUpdate(contactId,body,{new:true});
        return updatedContact;
    }

    async patchContact (contactId, body) {
        const updatedContact = await contact.findByIdAndUpdate(contactId,body,{new:true});
        return updatedContact;
    }

     async removeContact (contactId) {
        const deletedContact = await contact.findByIdAndDelete(contactId);
        return deletedContact;
    }
}

module.exports = new ContactsController;