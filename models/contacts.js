const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json")
console.log(contactsPath)

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);   
    
  } catch (error) {
    console.error(error)
  }  
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const stringId = stringifyId(contactId)
    const result = contacts.find(item => item.id === stringId);
    return result || null;

  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const stringId = stringifyId(contactId)
    const index = contacts.findIndex(item => item.id === stringId);
    if(index === -1){
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateAllContacts(contacts)
    return result;

  } catch (error) {
    console.error(error)
  }
}

const addContact = async (body) => {
  try {
    const {name, email, phone} = body
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }

    contacts.push(newContact)
    await updateAllContacts(contacts)
    return newContact

  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const {name, email, phone} = body
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    
    if(index === -1) {
      return null;
    }

    if (name) {
      contacts[index].name = name
    }
    if (email) {
      contacts[index].email = email
    }
    if (phone) {
      contacts[index].phone = phone
    }
    
    await updateAllContacts(contacts);
    return contacts[index]
    
  } catch (error) {
    console.error(error)
  }
 }


async function updateAllContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

function stringifyId(id) {
    return id.toString()
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
