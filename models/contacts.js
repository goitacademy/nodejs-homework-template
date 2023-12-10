const fs = require('fs/promises');

const path = require('path');

const contactsPath = path.join('models', 'contacts.json');

const listContacts = async () => {
  // Возвращает массив контактов.
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((item) => item.id === contactId);
    if (contact.length > 0) return contact[0];
    return null;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  // Возвращает объект добавленного контакта.
  try {
    const contacts = await listContacts();
    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return body;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    if (contact) {
      const filteredContacts = contacts.filter((item) => item.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  // Возвращает объект измененного контакта.
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    if (!contact) return null;
    const updatedContact = { ...contact, ...body };
    const newContacts = contacts.map((item) => {
      if (item.id === contactId) {
        item = updatedContact;
      }
      return item;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
