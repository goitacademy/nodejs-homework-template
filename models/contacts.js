// const path = require('path');
const fs = require('fs').promises;
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts.toString())
  } catch (error) {
     console.log(error)
  }
}

const getContactById = async (contactId) => {
   try {
     const contacts = await listContacts();
    const findContactById = contacts.find(
       c => c.id.toString().toLowerCase() === contactId.toString().toLowerCase());
     console.log(findContactById)
     if (!findContactById) {
       return null
     }

    return findContactById
  } catch (error) {
     console.log(error)
  }
}

const removeContact = async (contactId) => {
    try {
    const contacts = await listContacts();
      const delContact = contacts.filter(
        contact => contact.id.toLowerCase().toString() === contactId.toLowerCase().toString());
      
      const currentContacts = contacts.filter(
        contact => contact.id.toLowerCase().toString() !== contactId.toLowerCase().toString())

      await fs.writeFile((contactsPath), JSON.stringify(currentContacts));

      return delContact; 

  } catch (error) {
    console.log(error)
  }
}


const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body)

    await fs.writeFile((contactsPath), JSON.stringify(contacts))

    return body;

  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(c => c.id.toLowerCase().toString() === id.toLowerCase().toString());

    if (idx === -1) {
      return
    }

    contacts[idx] = { id, ...body }
    
    await fs.writeFile((contactsPath), JSON.stringify(contacts))

    return contacts[idx]

    
  } catch (error) {
    console.log(error)
  }
 }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

