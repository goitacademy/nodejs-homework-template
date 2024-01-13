const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const fileContent = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(fileContent);
    return contacts;
  } catch (error) {
    return JSON.parse(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const fileContent = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(fileContent);
    const [contact] = contacts.filter(el => el.id === contactId);
    return contact;
  } catch (error) {
    return JSON.parse(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const fileContent = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(fileContent);
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index >= 0) {
      contacts.splice(index, 1);
      const updatedContactsJson = JSON.stringify(contacts, null, 2);
      fs.writeFile(contactsPath, updatedContactsJson, 'utf-8');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const nanoidModule = await import('nanoid');
    const nanoid = nanoidModule.nanoid;
    const newContact = {
      id: nanoid(24),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const fileContent = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(fileContent);

    if (contacts.find(contact => contact.name.toUpperCase() === newContact.name.toUpperCase())) {
      return null;
    } else {
      contacts.push(newContact);
    }

    const updatedContactsJson = JSON.stringify(contacts, null, 2);

    fs.writeFile(contactsPath, updatedContactsJson, 'utf-8');
    return newContact;
  } catch (error) {
    return console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const fileContent = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(fileContent);
    const index = contacts.findIndex(contact => contact.id === contactId);
    let updatedContacts;

    if (index >= 0) {
      updatedContacts = contacts.map((contact, i) => {
        if (i !== index) {
          return contact;
        } else {
          return {
            ...contact,
            ...body,
          };
        }
      });

      const updatedContactsJson = JSON.stringify(updatedContacts, null, 2);

      await fs.writeFile(contactsPath, updatedContactsJson, 'utf-8');
      return updatedContacts.find(el => el.id === contactId);
    } else {
      return false;
    }
  } catch (error) {
    return console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
