const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const pathToContacts = path.join("models", "contacts.json");
// console.log(pathToContacts)

const listContacts = async () => {
  try {
    const data = await fs.readFile(pathToContacts);
    const contacts = JSON.parse(data);
    // console.log(JSON.parse(contacts))

    return contacts;
  } catch (error) {
    console.log(error);    
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(pathToContacts);
    const contacts = JSON.parse(data);

    const contact = contacts.filter((contact)=>{return contact.id === contactId})

    return contact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
    try {
    const data = await fs.readFile(pathToContacts);
    const contacts = JSON.parse(data);

    const contact = contacts.filter((contact)=>{return contact.id === contactId})
    const contactsWithoutRemove = contacts.filter((contact)=>{return contact.id !== contactId})

    await fs.writeFile(pathToContacts, JSON.stringify(contactsWithoutRemove))

    return contact;
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(pathToContacts);
    const contacts = JSON.parse(data);

    const newContact = {id: v4(), name: body.name, email: body.email, phone: body.phone};

    contacts.push(newContact)

    await fs.writeFile(pathToContacts, JSON.stringify(contacts))

    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(pathToContacts);
    const contacts = JSON.parse(data);

    contacts.map((contact) => {
      console.log(contact.name, contact.id, contactId)
    if (contactId === contact.id) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
    }
    
    return contact;
    })

    await fs.writeFile(pathToContacts, JSON.stringify(contacts))

    return contacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
