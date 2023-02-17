const fs = require('fs/promises')
const path = require('path');
const { stringify } = require('querystring');
const contactsPath = path.resolve('./models/contacts.json')

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, { encoding: "utf8" }))
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, { encoding: "utf8" }))
  return contacts.find((x)=>+x.id===+contactId)
}

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, { encoding: "utf8" }))
  const newcontacts=contacts.filter((x) => parseInt(x.id) != +contactId)
  if (newcontacts.length===contacts.length) return 'failure'
  fs.writeFile(contactsPath,JSON.stringify(newcontacts))
  return 'success'
}

const addContact = async (body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, { encoding: "utf8" }))
  contacts.push(body);
  fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, { encoding: "utf8" }))
  let isContactUpdated = false;
  let updatedContact
  const newContacts = contacts.map((x)=>{
    if (+x.id!=+contactId) return x
    isContactUpdated=true;
    updatedContact={
      id : contactId+'',
      name: (body.name) ? body.name : x.name, 
      email: (body.email) ? body.email : x.email,
      phone: (body.phone) ? body.phone : x.phone,
    }
    return updatedContact
  })
  if (!isContactUpdated) return false
  fs.writeFile(contactsPath,JSON.stringify(newContacts))
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
