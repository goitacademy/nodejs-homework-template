const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(response);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
    try {
      const contacts = await listContacts();
      const [selectedContact] = contacts.filter(contact => contact.id === contactId);
      return selectedContact || null;
    } catch (error) {
      console.log(error);
    }
}

const removeContact = async (contactId) => {
    try {
      const contacts = await listContacts();
      const deletedContactIndex = contacts.findIndex(contact => contact.id === contactId);

      if (deletedContactIndex === -1) {
        return null;
      }
      const deletedContact = contacts.splice(deletedContactIndex, 1);

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return deletedContact;
    } catch (error) {
      console.log(error);
    }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return body;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    contacts.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = body.name;
        contact.email = body.email;
        contact.phone = body.phone;
      }
    });
   
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return body;

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
