const path = require('path');
const fs = require('fs').promises;

// const pathDataBase = `__dirname, '..', 'models', 'contacts.json`

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(path.join(__dirname, '..', 'models', 'contacts.json'));
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

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body)
    await fs.writeFile(path.join(__dirname, '..', 'models', 'contacts.json'), JSON.stringify(contacts))
    return body;

  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => { }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

