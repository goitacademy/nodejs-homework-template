// const fs = require('fs/promises')

// const listContacts = async () => {}

//  const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

const { nanoid } = require("nanoid");
const path = require("path")
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "contacts.json") // убрала \ перед дб
console.log(contactsPath)

async function listContacts  () {
    const data = await fs.readFile(contactsPath)
    console.log("list")
    return JSON.parse(data)
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find(item => item.id === contactId)
    return result

}
async function removeContact(contactId) {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if(index === -1){
        return null
    }
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}

async function addContact({name, email, phone}) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name, 
        email, 
        phone
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
  }

  async function updateContact(contactId, data) {
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId)
    if(index === -1){
        return null
    }
    contacts[index]={contactId, ...data}
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[index]
  }
//   module.exports = {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
