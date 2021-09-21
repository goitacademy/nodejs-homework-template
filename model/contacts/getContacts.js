 const fs = require('fs/promises')
const path = require('path')
 
const contactsPath = path.join(__dirname, './contacts.json')
 



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
const updateContacts = async (newContacts) => {
   await fs.writeFile(contactsPath, JSON.stringify(newContacts))
 }


module.exports = {
    getContacts,
    updateContacts,
}