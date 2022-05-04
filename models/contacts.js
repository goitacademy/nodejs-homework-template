
const fs = require('fs/promises') // FileSystem
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.resolve(__dirname, './contacts.json')

const getData = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8')
  const data = JSON.parse(contacts)
  return data
}

const listContacts = async (req, res) => {
  try {
    const contacts = await getData()
    res.status(200).json(contacts);
    return contacts
  } catch (error) {
    // отлавливает серверные ошибки прописанные в app.js
    console.log('🍒 error:', error.massage)
  }
}

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contacts = await getData()
    const isId = contacts.some(item => item.id === contactId)
    // console.log('🍒 isId', isId)
    const contactById = await contacts.filter(item => item.id === contactId);
    if (isId) {
      res.status(200).json(contactById)
    } else {
      res.status(404).json({ message: `Contact with id:"${contactId}" was not found` });
    }
  } catch (error) {
    console.log('🍒 error', error)
  }
};


const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const contacts = await getData()
    const isId = contacts.some(item => item.id === contactId)

    if (isId) {
      const newContacts = contacts.filter(item => item.id !== contactId)
      fs.writeFile(contactsPath, JSON.stringify(newContacts))
      res.status(200).json({ message: `Contact with id:"${contactId}" was deleted` });
    } else {
      res.status(404).json({ message: `Contact with id:"${contactId}" was not found` })
    }
  } catch (error) {
    console.log('🍒 error:', error.massage)
  }
}


const addContact = async (req, res) => {
  try {
    const contacts = await getData();
    const { name, email, phone } = req.body;

    if (name && email && phone) {
      const newContact = { name, email, phone, id: nanoid() };

      fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
      res.status(201).json(newContact);
    } else {
      res.status(400).json({ message: "Missing required name field" });
    }
  } catch (error) {
    console.log('🍒 error', error)
  }
};


const updateContact = async (req, res) => {
  try {
    const contacts = await getData();
    const { contactId } = req.params
    const isContact = contacts.some((item) => item.id === contactId);
    const { name, email, phone } = req.body;

    if (Object.keys(req.body).length < 3) {
      res.status(400).json({ message: "Missing fields" });
    } else if (!isContact) res.status(404).json({ message: "Not found" });
    else {
      contacts.forEach((item) => {
        if (item.id === contactId) {
          item.name = name || item.name;
          item.email = email || item.email;
          item.phone = phone || item.phone;
        }
      });
      fs.writeFile(contactsPath, JSON.stringify(contacts));
      const updatedContact = contacts.filter((item) => item.id === contactId);
      res.json(updatedContact);
    }
  } catch (error) {
    console.log('🍒 error', error)
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
