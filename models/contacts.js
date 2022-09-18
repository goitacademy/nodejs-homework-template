const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    return fs.readFile(contactsPath, 'utf8');
  } catch (error) {
    console.log(error);
  } 
}

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await listContacts());
    const [contact] = contacts.filter(contact => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
    try {
      const contacts = JSON.parse(await listContacts());
      const filteredContacts = contacts.filter(contact => contact.id !== contactId);
      
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), 'utf8');
      return contacts;  
    } catch (error) {
        console.log(error);    
    }
}

const addContact = async (body) => {
  try {
    const prevContacts = JSON.parse(await listContacts());
    const { name, email, phone } = body;

    const newContact = { id, name, email, phone };
    const allContacts = [...prevContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(allContacts), 'utf8');
    return newContact;
  } catch (error) {
    console.log(error); 
  }
}

const updateContact = async (contactId, body) => { 
  try {
    const contacts = JSON.parse(await listContacts());
    const { name, email, phone } = body;

    contacts.forEach(contact => {
      if (contact.id === contactId) {
        if (name) {
          contact.name = name;
        }
        if (email) {
          contact.email = email;
        }
        if (phone) {
          contact.phone = phone;
        }      
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
    return contacts;
  } catch (error) {
    console.log(error); 
  }

}


updateContact('3', {name: 'Tara t'})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
