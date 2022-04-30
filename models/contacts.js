const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    const data = JSON.parse(contacts)
    res.status(200).json(data);
    return data   // ????
  } catch (error) {
    // отлавливает серверные ошибки
    console.log('🍒 error:', error.massage)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await listContacts()
    const contactById = contacts.filter(item => item.id === contactId)

    if (contactById) {
      res.status(200).json(contactById);
    } else {
      res.status(404).json({ message: `Contact with id: ${contactId} was not found` })
    }
  } catch (error) {
    console.log('🍒 error:', error.massage)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await listContacts()
    if (contactId) {
      const newContacts = contacts.filter(item => item.id !== contactId)
      fs.writeFile(contactsPath, JSON.stringify(newContacts))
      res.status(200).json({ message: `Contact with id: ${contactId} was deleted` });
    } else {
      res.status(404).json({ message: `Contact with id: ${contactId} was not found` })
    }
  } catch (error) {
    console.log('🍒 error:', error.massage)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    const { name, email, phone } = req.body
    if (name && email && phone) {
      const newContact = { name, email, phone, id: nanoid() }
      fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]))
      res.status(201).json({ message: `${newContact} was added successfully` });
    } else {
      res.status(400).json({ message: 'Missing required name field' });
    }
  } catch (error) {
    console.log('🍒 error:', error.massage)
  }

}

const updateContact = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    const { contactId } = req.params

    const contact = contacts.filter(item => item.id === contactId)
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
      res.status(400).json({ message: 'Missing fields' });
    }
    else if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      contacts.forEach(item => {
        if (item.id === contactId) {
          item.email = email || item.email;
          item.name = name || item.name;
          item.phone = phone || item.phone;
        }
      });
    }
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    const updatedContact = contacts.filter(item => item.id === contactId)
    res.status(200).json({ message: `${updatedContact} was updated successfully` });
  } catch (error) {
    console.log('🍒 error:', error.massage)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
