const {nanoid} = require('nanoid')
const fs = require('fs/promises');
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json');


// TODO: задокументировать каждую функцию
const listContacts = async () => {
    // ...твой код. Возвращает массив контактов.
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId)
  return result || null;
};

const removeContact = async (contactId) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId)
  if (result === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(result, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const addContact = async (data) => {
  // ...твой код. Возвращает объект добавленного контакта. 
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
