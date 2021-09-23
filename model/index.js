 const fs = require('fs/promises')
/*  const contacts = require('./contacts.json') */



const { listContacts } = require('./contacts/listContacts')
const { getContactById } = require('./contacts/getContactById')
const { removeContact } = require('./contacts/removeContact')
const { addContact } =  require('./contacts/addContact')
const { updateContactById } = require('./contacts/updateContactById')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}





/*   const contactsPath = path.join(__dirname, './contacts.json') */
/* 
const updateContacts = async (newContacts) => {
   await fs.writeFile(contactsPath, JSON.stringify(newContacts))
 }


const getContacts = async () =>  {
   try {
    const data = await fs.readFile(contactsPath)
     const contacts = JSON.parse(data)
    //  console.table(contacts)
    return contacts
  } catch (error) {
    console.log(error)
  }
}
 */
/* const listContacts = async () => {
  try {
    const contacts = await getContacts()
    console.table(contacts)
  } catch (error) {
    console.log(error)
  }
}
 */


/* const getContactById = async (contactId) => {
    try {
  const contacts = await getContacts();
    const contact = contacts.find(contact => String(contact.id) === String(contactId));
    if(!contact) {
        return null;
    }
    console.table(contact) 
} catch (error) {
    console.log(error)
  }
} */
/* 
const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const idx = contacts.findIndex(contact => String(contact.id) === String(contactId))
    if (idx === -1) {
      return null
    }
    contacts.splice(idx, 1);
    await updateContacts(contacts);
    console.table(contacts)
    return "Success remove"


  } catch (error) {
    console.log(error)
  }
} */
  
 /*  
const addContact = async (name, email, phone) => {
 
  const contacts = await getContacts();
  const id = v4()
  const newContact = { id, name, email, phone }
  contacts.push(newContact);
  console.log(newContact)
  await updateContacts(contacts)
  console.table(contacts)
  
  
} */


/* 
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
} */
