const  { v4 } =  require('uuid') 
const path = require('path');
const fs = require('fs').promises

const contactsPath = path.join('models', 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log('err')
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contacts = data.find(el => el.id === contactId)
    return contacts;
  } catch (error) {
    console.log('err')
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await listContacts()
    const contactIndex = data.some((item) => item.id === contactId);
    const contact = data.filter(el => el.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(contact))
    
    
    return contactIndex
  } catch (error) {
    console.log('err')
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const newContact = {id: v4(), name: body.name, email: body.email, phone: body.phone}
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    
    return contacts
  } catch (error) {
    console.log('err')
  }
}

const updateContact = async (contactId, body) => {
  
  try {
    const data = await listContacts()
    data.forEach(element => {
      if(element.id === contactId){
        element.id = contactId;
        element.name = body.name;
        element.email = body.email;
        element.phone = body.phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(data))
    return data
    
  } catch (error) {
    console.log('err')
  }
  
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
