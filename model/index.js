const { error } = require('console')
const fs = require('fs').promises
const json = './contacts.json'
const path = require('path');
const contactsPath = path.join(__dirname, json);

const listContacts = async () => {
  try {
    // const data = await fs.readFile(contactsPath, 'utf8');
    // const result = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    const result = list.find(item => {
    if (item.id === contactId) {
        console.table(item);
      }
    })
  }
  catch(error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    const result = list.filter(item => item.id !== contactId);

    if (list.length === result.length) {
      console.log('not removed');
      return;
    }
    console.log(`Delete ${contactId} id`);
    console.table(result);
    fs.writeFile(contactsPath, JSON.stringify(result));
  }
  catch(error) {
    console.log(error);
  }
}

const addContact = async (body) => {
    try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
  
    list.push({
      id: shortid.generate(),
      body,
    })
    console.log('add');
    console.table(list);
    fs.writeFile(contactsPath, JSON.stringify(list));
  } catch(error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
