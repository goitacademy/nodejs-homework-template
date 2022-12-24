

const fs = require('fs/promises');
const path = require('path');

const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, '../modules/contacts.json');

const listContacts = async () => {
  try {

    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
        
        const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === contactId);
        console.log(result);
    
    return result || null;
    
    } catch (error) {
        console.log(error);
    
    }
}

const removeContact = async (contactId) => {
      try {
        const allContacts = await listContacts();
        const index = allContacts.findIndex(item => item.id === contactId);
        if (index === -1) {
            return null;
        }
        const [result] = allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return result;
    } catch (error) {
        console.log(error);
    }
}

const addNewContact = async ({name, email, phone}) => {
      try {
        const allContacts = await listContacts();

        const newContact = {
            id: nanoid(4),
            name: name,
            email: email,
            phone: phone,
        }
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error);
    }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addNewContact,
  updateContact,
}
