const fs = require('fs/promises');
const uuid = require('uuid').v4;
const { createContactValidator, updateContactValidator } = require('../utils/contsactValidator');

const contactsDB = './controllers/contacts.json';

// GET contacts list
const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(
      await fs.readFile(contactsDB)
    )
    return res.status(200).json({
      status: 'success',
      contacts,
    })
  } catch (err) {
    res.status(400).json({
      message: 'Something wrong...'
    })
  }
}

// GET contact By ID
const getContactById = async (req, res) => {
  try {
    const { contact } = req;
    return res.status(200).json({
      status: 'success',
      contact,
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({
      message: 'Contact not found'
    })
  }
}

// DELETE contact
const removeContact = async (req, res) => {
  const { contact } = req;
  let contacts = JSON.parse(
    await fs.readFile(contactsDB)
  )
  const newcontacts = contacts.filter(item => item.id !== contact.id);
  contacts = [...newcontacts];
  await fs.writeFile(contactsDB, JSON.stringify(contacts, null, 2))
  return res.status(200).json({
    message: 'Contact deleted',
    status: 'success',
    contacts,
  });
}

// POST new contact
const addContact = async (req, res) => {
  try {
    const { error, value } = createContactValidator(req.body);

    if (error) {
      const fieldName = error.details[0].path[0];
      console.log(fieldName)
      return res.status(400).json({
        message: `missing required <${fieldName}> field`
      })
    }
    const contacts = JSON.parse(
      await fs.readFile(contactsDB)
    )
    const newContact = {
      id: uuid(),
      ...value,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsDB, JSON.stringify(contacts))
    return res.status(201).json({
      message: 'Contact is added',
      newContact,
    })
  } catch (err) {
    res.status(400).json({
      message: 'Something wrong...'
    })
  }
}

//  PUT contact by ID
const updateContact = async (req, res) => {
  try {
    const { error, value } = updateContactValidator(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Invalid data...'
      })
    }
    const { contact } = req;
    const contacts = JSON.parse(
      await fs.readFile(contactsDB)
    );
    const updatedContacts = contacts.map(item => {
      if (item.id === contact.id) {
        return { ...item, ...value };
      }
      return item;
    });
    await fs.writeFile(contactsDB, JSON.stringify(updatedContacts, null, 2));
    const updatedContact = updatedContacts.find(item => item.id === contact.id);
    res.status(200).json({
      updatedContact,
    })
  } catch (err) {
    res.status(404).json({
      message: 'Not found'
    })
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
