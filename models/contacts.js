const fs = require('fs/promises');
const uuidv4 = require('uuid');

const filePath = './contacts.json';

const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const fileData = JSON.parse(data);
    
    return fileData;
  } catch (error) {
    console.error('Помилка читання файлу:', error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const fileData = JSON.parse(data); 

    const foundContact = fileData.find(contact => contact.id === contactId);

    return foundContact || null;

  } catch (error) {
      console.error('Помилка читання файлу:', error);
      return null;
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const fileData = JSON.parse(data);

    
    const removedContact = fileData.filter(contact => contact.id === contactId);
    const removedContactID = fileData.findIndex(contact => contact.id === contactId);

    fileData.splice(removedContactID, 1);

    const updatedData = JSON.stringify(fileData, null, 2);

    fs.writeFile(filePath, updatedData);
  
    return removedContact[0] || null;


} catch (error) {
    console.error('Помилка читання файлу:', error);
  }
}

const addContact = async (body) => {
  try {
    const newContact = {
        "id": uuidv4(),
        "name": body.name,
        "email": body.email,
        "phone": body.phone
    };

    const data = await fs.readFile(filePath, 'utf-8');
    const fileData = JSON.parse(data);

    fileData.push(newContact);

    const updatedData = JSON.stringify(fileData, null, 2);

    fs.writeFile(filePath, updatedData);
    return newContact;

} catch (error) {
    console.error('Помилка читання файлу:', error);
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

