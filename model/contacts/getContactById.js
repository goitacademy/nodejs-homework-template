const { getContacts } = require('./getContacts')
// const contacts = require('../contacts.json')

const getContactById = async (contactId) => {
    try {
  const contacts = await getContacts();
    const contact = contacts.find(contact => String(contact.id) === String(contactId));
    if(!contact) {
        return null;
        }
        return contact
    // console.table(contact) 
} catch (error) {
    console.log(error)
  }
}

module.exports = {
    getContactById
}