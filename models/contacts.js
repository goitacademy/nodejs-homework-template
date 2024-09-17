const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join("models/contacts.json");


async function listContacts() {
    try {
      const response = await fs.readFile(contactsPath);
      const contacts = JSON.parse(response);
      return contacts;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      const findedContact = contacts.find((contact) => contact.id === contactId);
      if (!findedContact) {
        return null;
      }
      return findedContact;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const deletedContactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
  
      if (deletedContactIndex === -1) {
        return null;
      }
      const deletedContact = contacts.splice(deletedContactIndex, 1);
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return deletedContact;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function addContact(contact) {
    try {
      const contacts = await listContacts();
      if (!contact.name || !contact.email || !contact.phone) {
        return null;
      }
      const newContact = {
        id: crypto.randomUUID(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      };
      const newContacts = [...contacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(newContacts));
      return newContact;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateContact(contactId, body) {
    try {
      const contacts = await listContacts();
      const contactToUpdate = contacts.find((contact) => contact.id === contactId);
  
      if (!contactToUpdate) {
        return null;
      }
  
      if (body.name) {
        contactToUpdate.name = body.name;
      }
      if (body.email) {
        contactToUpdate.email = body.email;
      }
      if (body.phone) {
        contactToUpdate.phone = body.phone;
      }
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
  
      return contactToUpdate;
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
  };