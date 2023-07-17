const fs = require('fs/promises')
const path = require('path')
const {v4: uuidv4} = require('uuid')

const contactPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    const contacts = JSON.parse(data);
    const result = contacts.find(el => el.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error)
  }
}


const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(el => el.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8')
    const contacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const emailExist = contacts.some(el => el.email === email);

    if (!emailExist) {
      contacts.push(newContact);
      await fs.writeFile(contactPath, JSON.stringify(contacts));
      console.log('Contact succsessfully added!');
    } else {
      console.log('Contact with this email alredy exists');
    }
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, body) => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8');
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(el => el.id === id)
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...body };
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
