 const fs = require('fs/promises')
const { v4: uuid4 } = require('uuid')
const path = require('path');


const contactsPath = path.join(__dirname, './contacts.json');


const listContacts = async () => {
   try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response)
    return contacts  
  }
  catch (err) { console.log(err) }
}




const getContactById = async contactId => {
    try {
     const contacts = await listContacts()
    
    const userId = contacts.find(
      contact => contact.id.toString() === contactId)
       return  userId
    }
  catch (err) {
    console.log(err)
  }
}

const removeContact = async (id) => {
  try {
    
    const contacts = await listContacts()
    const getContactId = await getContactById(id)
    if (!getContactId) {
      return console.log('нет контакта с таким Id')
    }
    const updateList = contacts.filter(contact => contact.id.toString() !== id)
    await fs.writeFile(contactsPath, JSON.stringify(updateList, null, '\t'))
    return updateList
  } catch (err) {
    console.log(err)
}
 
}

const addContact = async ({name, email, phone}) => {
   try {
     const contacts = await listContacts()
     
   contacts.push({id: uuid4(),
      name,
      email,
      phone});

     fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
     
  }catch(err){console.log(err)}
}

const updateContact = async (contactId, body) => {
   try {
     const contacts = await listContacts()
     const findUser = await getContactById(contactId)
     const updateContact = Object.assign(findUser, body)
     
   const updateList = contacts.map(contact => contact.id === contactId ? updateContact : contact)

     await fs.writeFile(contactsPath, JSON.stringify(updateList, null, '\t'))
     return updateList
     
  }catch(err){console.log(err)}


}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
