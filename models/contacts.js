const fs = require('fs/promises')
const contactsPath = './models/contacts.json'

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  } catch (err) {
    throw err
    // Обробка помилок, якщо файл не може бути прочитаний або JSON не може бути розпарсений.
  }
}

const getContactById = async (contactId) => {
  // Пошук контакту за id
  try {
    const contacts = await listContacts();
    // const contact = contacts.find(contact => contact.id === Number.parseInt(contactId))
    const contact = contacts.find(({ id }) => id.toString() === contactId)
    return contact
  } catch (err) {
    throw err
  }
}

const removeContact = async (contactId) => { }

const addContact = async (body) => { }

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
