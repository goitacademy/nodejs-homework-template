const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
}

const getContactById = async (contactId) => {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts.find((contact) => contact.id === contactId)
}

const removeContact = async (contactId) => {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const index = contacts.findIndex((contact) => contact.id === contactId)
    contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
}

const updateContact = async (contactId, body) => {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const index = contacts.findIndex((contact) => contact.id === contactId)
    contacts[index] = {
    ...contacts[index],
    ...body,
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
