const fs = require('fs/promises')
const path = require('path')
const uuid = require('uuid').v4;

const contacts = path.join("models","contacts.json")



const listContacts =  async () => {
  return JSON.parse(await fs.readFile(contacts))
}



const getContactById = async (contactId) => {
    contactList = await listContacts()
    const [findContact] = contactList.filter(contact => contactId === contact.id)
    return findContact
}



const removeContact = async (contactId) => {

  const findContact = await getContactById(contactId)

  // Якщо контакт не знайдений повертаємо false
  if(!findContact) { return false } 

  // В іншому випадку фільтруємо файл з контактами і записуємо новий файл
  try {

    const dataContacts = await listContacts()
    const newContactsList = dataContacts.filter(contact => contactId !== contact.id)
    await fs.writeFile(contacts, JSON.stringify(newContactsList));
    return true

  } catch (error) {
    return false
  }
    


}

const addContact = async (name, email, phone) => {

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    }

    try {

      const dataContacts = await listContacts()
      dataContacts.push(newContact)
      await fs.writeFile(contacts, JSON.stringify(dataContacts));
      return newContact

    } catch (error) {
      console.log(error)
      return false
    }

    


}

const updateContact = async (contactId, body) => {

  try {
    contactList = await listContacts()
    const [findContact] = contactList.filter(contact => contactId === contact.id)
    
    if(!findContact) {
      return false
    }

    updateFindContact = {
      ...findContact,
      ...body
    }

    newContactsList = contactList.filter(contact => contactId !== contact.id)
    newContactsList.push(updateFindContact)
    await fs.writeFile(contacts, JSON.stringify(newContactsList))

    return updateFindContact

  } catch (error) {

      console.log(error)
      return false
    
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
