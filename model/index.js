const { error } = require('console')
const fs = require('fs').promises
const json = './contacts.json'
const path = require('path');
const contactsPath = path.join(__dirname, json);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    const result = list.find(item => parseInt(item.id) === parseInt(contactId));
    return result;
  }
  catch(error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    const result = list.filter(({id}) => parseInt( id ) !== parseInt( contactId));
    fs.writeFile(contactsPath, JSON.stringify(result));
    return result;
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
        id: list.length + 1,
        ...body
      });
      fs.writeFile(contactsPath, JSON.stringify(list));
      return list;
  } catch(error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    list.map(item => {
      if (item.id === parseInt(contactId)) {
        console.log('enter');
        // const replace =  Object.assign(item.id, body);
        fs.writeFile(contactsPath, JSON.stringify(replace));
        return list;
      } else {
        return 'error, this id is not found';
      }
    })
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
