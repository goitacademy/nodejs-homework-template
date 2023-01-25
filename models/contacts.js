const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, 'models/contacts.json')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, {encoding: 'utf-8'})
    const parsedContacts = JSON.parse(contacts)
    return parsedContacts

  }
  catch (e) {
    console.log(e)
  }
}

const pushContacts = async contacts => {
  try {
    const strContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, strContacts)
  }
  catch (e) {
    console.log(e)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const contactbyId = parsedContacts.filter(({id}) => (id === contactId));
    return contactbyId
  }
  catch(e) {
    console.log(e)
  }

}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const updatedContacts = await contacts.filter((contact) => 
      contact.id !== contactId
    );
    await pushContacts(updatedContacts)
    return updatedContacts;
    
  }
  catch (e) {
    console.log(e)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    }
    const updatedContacts = [newContact, ...contacts];
    const strUpdatedContacts = JSON.stringify(updatedContacts)
    await fs.writeFile(contactsPath, strUpdatedContacts)
    console.log('contact added')
  }
  catch(e) {

  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const i = contacts.findIndex(({id}) => id === contactId);
    if (i === -1) return
    else {
      contacts[i] = { ...contacts[i], ...body};
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return contacts[i]
    }
  }
  catch(e) {
    console.log(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
