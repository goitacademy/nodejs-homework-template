const getAll = require('./getAll')
const updateContact = require('./updateContacts')

const removeContact = async (contactId) => {
    const contactList = await getAll();
    const newContactList =  contactList.filter(contact => contact.id !== Number(contactId))
    const contactById = contactList.find(contact => contact.id === Number(contactId))
    await updateContact(newContactList)  
    return contactById;
  }
  
  module.exports = removeContact