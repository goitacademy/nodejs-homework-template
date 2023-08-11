const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
// Читает из db все данные. Парсит и возвращает полный список контактов.
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log('Error:', error.message)
  }
}

const getContactById = async (contactId) => {
  // Возвращает объект контакта с id.
  // Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const result = contacts.find(elem => elem.id === contactId);
    return result || null;
  } catch (error) {
    console.log('Error:', error.message)
  }
}

const removeContact = async (contactId) => {
  // Удаляет контакт по id из db. Возвращает объект удаленного контакта.
  // Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(elem => elem.id === contactId);
    if (index === -1) { return null };
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return result;
  } catch (error) {
    console.log('Error:', error.message)
  }
}

const addContact = async (body) => {
  // Добавляет новый контакт. Возвращает объект добавленного контакта. 
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log('Error:', error.message)
  }
}

async function updateContact(contactId, body) {
  // Обновляет контакт по Id. Возвращает объект обновленного контакта.
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(elem => elem.id === contactId);
    if (index === -1) { return null };
   // const updatedContact = { id: contactId, ...body };
    const updatedContact = { ...contacts[index], ...body };

    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  } catch (error) {
    console.log('Error:', error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
