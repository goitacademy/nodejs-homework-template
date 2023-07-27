const fs = require('fs/promises')
const path = require('path');


const contactsPath = path.join(__dirname, 'contacts.json')
const read = fs.readFile(contactsPath).then(data => JSON.parse(data));

const listContacts = async () => {
  const data = await read;
  console.table(data)
  return data;
}

const getContactById = async (contactId) => {
  const data = await read;
  const contactById = data.find(item => item.id === contactId);
  if (contactById) {
    console.table(contactById);
    return contactById;
    } else {
    return null;
  };
  // return contactById || null;
  
}

const removeContact = async (contactId) => {
  const data = await read;
  const newData = data.filter(item => item.id !== contactId);
  await fs.writeFile('contacts.json', JSON.stringify(newData));
  return data.find(data.id === contactId)
}

const addContact = async ({ name, email, phone }) => {
  const data = await read;

  const body = {
    // id,
    name,
    email,
    phone
  };

  data.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(data))
  return body;
}

const updateContact = async (contactId, body) => {
  const data = await read;
  const newContact = data.map(item => {
    if (item.id === contactId) {
      return item
    }
    return newContact;
  })
  const updatedContact = { ...newContact, ...body };
  await fs.writeFile(contactsPath, JSON.stringify([...data, updatedContact]))
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
