const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '/contacts.json')

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf8')
    return data
}

const getContactById = async (contactId) => {
  const result = await listContacts()
    .then(data => JSON.parse(data).find(({id}) => id === contactId))
 
  return JSON.stringify(result)
}

const removeContact = async (contactId) => {
  const result = await listContacts()
    .then(data => JSON.parse(data).filter(({id}) => id !== contactId))

    try {
      await fs.writeFile(contactsPath, JSON.stringify(result))  
    } catch (err) {
        console.error(err)
      }
}

const addContact = async (newContact) => {
  const isExistContact = getContactById(newContact.id).length

  const result = await listContacts()
    .then(data => [...JSON.parse(data), newContact])
    
    try {
      if (!isExistContact) {
        await fs.writeFile(contactsPath, JSON.stringify(result))
      }
      else { return `Сontact ${newContact.name} already exists!` }
    } catch (err) {
        console.error(err)
      }

  return JSON.stringify(newContact)
}

const updateContact = async (contactId, body) => {

  const result = await listContacts().then(data => JSON.parse(data))
  const arayNotChange = result.filter(({id}) => id !== contactId)

  const findContact = result.find(({id}) => id === contactId)

  console.log(findContact)

  const updateContact = {
    ...findContact,
    ...body
  }

  try {
    if (findContact.length) {
      await fs.writeFile(contactsPath, JSON.stringify([...arayNotChange, updateContact]))
      return JSON.stringify(updateContact)
    }
    else { return `Сontact ${body.name} don't exists!` }
  } catch (err) {
      console.error(err)
    }
  

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
