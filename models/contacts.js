const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve(__dirname, 'contacts.json');
const contactList = fs.readFileSync(contactsPath, 'utf-8');
const contacts = JSON.parse(contactList);

const listContacts = () => {
  console.log('List of contacts: ');
  console.table(contacts);

  return contacts;
};

const getContactById = (contactId, errorMessage) => {
  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    throw new Error(errorMessage);
  }

  console.log(`Get contact by ID=${contactId}`);
  console.table(foundContact);

  return foundContact;
};

const removeContact = (contactId, errorMessage) => {
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (newContacts.length === contacts.length) {
    console.log(errorMessage);
    return newContacts;
  }

  console.log('Contact deleted successfully! New list of contacts : ');
  console.table(newContacts);

  fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
    if (error) {
      return console.log('error :', error);
    }
  });

  return newContacts;
};

const addContact = (name, email, phone) => {
  contacts.push({
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  });

  console.log('Contacts added successfully! New list contacts : ');
  console.table(contacts);

  fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error);
    }
  });
  return contacts;
};

const updateContact = (contactId, name, email, phone, errorMessage) => {
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log('contact', contactId);

  if (!contact) {
    console.log(errorMessage);
    return;
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  console.log(`Contact with ID ${contactId} updated`);
  console.table(contacts);

  fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
    if (error) {
      return console.log(error);
    }
  });

  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
