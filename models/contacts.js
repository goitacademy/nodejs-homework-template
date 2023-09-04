// const express = require("express");
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = './models/contacts.json';

const listContacts = async () => {
  // Повертає масив контактів.
     const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
      const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();

    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
    
}

const addContact = async (name, email, phone) => {
    // Повертає об'єкт доданого контакту.
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...name,
        ...email,
        ...phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
