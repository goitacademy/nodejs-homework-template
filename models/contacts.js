const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join(__dirname,'contacts.json' );

const listContacts = async () => {
    try {
      const contacts = await fs.readFile(contactsPath);
      console.log(contacts);
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find(contact => contact.id === contactId);
        if (!result)
            { return null; }
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        }
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId)
        if (index === -1) { 
            return null;
        }
        const [removeContact] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removeContact;
    } catch (error) {
        console.log(error.message);
    }
};


const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
