const fs = require('fs/promises');
const path = require('node:path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
      const contacts = await fs.readFile(contactsPath, 'utf8', (error, data) => {
          if (error) console.log(error);
          return data;
      });
      return JSON.parse(contacts);
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (contactId) => {
  try {
      const contacts = await listContacts();
      const foundContact = contacts.find(contact => contact.id === contactId.toString() )
      return foundContact || null;
    } catch (error) {
        console.log(error)
    }
}

const removeContact = async (contactId) => {
  try {
      const contacts = await listContacts();
      const index = contacts.findIndex(contact => contact.id === contactId);
      if (index === -1) null;
      const [result] = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8', (error) => {
        if (error) console.log(error);
      });
      return result;
    } catch (error) {
        console.log(error)
    }
}

const addContact = async (body) => {
  try {
      const { name, email, phone } = body;
      const contacts = await listContacts();
    const newId = contacts.length + 1;
      const newContact = {
        id: newId.toString(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8', (error) => {
        if (error) console.log(error);
      });

      return newContact;
    } catch (error) {
        console.log(error)
    }
}

const updateContact = async (contactId, body) => {
  try {
      const contacts = await listContacts();
      const index = contacts.findIndex(contact => contact.id === contactId);
      if (index === -1) null;
      contacts[index] = {contactId, ...body};
      
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8', (error) => {
        if (error) console.log(error);
      });
    
      return contacts[index];
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}