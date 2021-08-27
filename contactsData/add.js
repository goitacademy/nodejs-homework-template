const { v4 } = require('uuid')

const listContacts = require('./getAll')
const updateContacts = require('./updateContacts')

const addContact = async (newContactData) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...newContactData, id: v4() };
  
    // const newContacts = [...contacts, newContact]
    contacts.push(newContact)

    await updateContacts(contacts)
    
    console.log(newContact)
    return newContact
  }
  catch (error) {
    throw error
  }
}

module.exports = addContact