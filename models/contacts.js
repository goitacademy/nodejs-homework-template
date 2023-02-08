const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');
const readData = fs.readFile(contactsPath, 'utf-8');


const listContacts = async () => {
  try{
    const data = await readData;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try{
    const data = await readData;
    const parseData = JSON.parse(data);

    const oneContact = parseData.find((e) => e.id === `${contactId}`);

    if(!oneContact){
      return null;
    }
    return oneContact
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try{
    let newContacts = [];
    const data = await readData;
    const parseData = JSON.parse(data);

    parseData.map((contact) => {
      if(contact.id !== contactId){
        newContacts = [...newContacts, contact];
      }
    return newContacts
    });

    if(data.length === newContacts.length){
      return null
    };

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf-8');

    const removeContacts = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(removeContacts);

  } catch (error) {
    console.log(error)
  }
}

const addContact = async (name, email, phone) => {
  try{
    const data = await readData;
    const parseData = JSON.parse(data);

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const allContacts = [...parseData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(allContacts), 'utf-8');
    return newContact;

  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  const data = await readData;
  const parseData = JSON.parse(data);
  let updatedContact = {};

  parseData.forEach((item) => {
    if(item.id === contactId){
      item.name = body.name;
      item.email = body.email;
      item.phone = body.phone;
      updatedContact = {...item};
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(parseData), 'utf-8');
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
