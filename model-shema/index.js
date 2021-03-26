const Contact = require('./schema/contactSchema');

async function listContact() {
    try {
        const contactList = await Contact.find({});
        console.log(contactList) 
    }
    catch (error) {
        console.log(error)
    }
}
listContact()

async function addContact (body) {
    try {
      const newContact = await Contact.create(body);
        console.log(newContact) 
    }
    catch (error) {
        console.log(error)
    }
}
addContact()

async function getContactById (contactId) {
    try {
      const contact = await Contact.findById(contactId);
        console.log(contact) 
    }
    catch (error) {
        console.log(error)
    }
}
getContactById()

async function removeContact (contactId) {
    try {
      const removedContact = await Contact.findByIdAndDelete(contactId);
        console.log(removedContact) 
    }
    catch (error) {
        console.log(error)
    }
}
removeContact()
 
async function updateContact  (contactId, body) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
        console.log(updatedContact) 
    }
    catch (error) {
        console.log(error)
    }
}

updateContact()

module.exports = {
    listContact,
    addContact,
    getContactById,
    removeContact,
    updateContact
}

// const getContactById = async contactId => {
//     const contact = await Contact.findById(contactId)
//     return contact
// }
