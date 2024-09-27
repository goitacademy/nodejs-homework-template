const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const { contactsValiadation } = require('../utils/joiValiadator');

const contactsPath = path.join('models', 'contacts.json');

const listContacts = async (req, res) => {
      try {
        const contactsList = await fs.readFile(contactsPath);
        return res.status(200).json(JSON.parse(contactsList));   
    } catch (err) {
        res.sendStatus(500);
    }
}

const getContactById = async (req, res) => {
  
  try {
    const { id } = req.params;
    const findContact = JSON.parse(await fs.readFile(contactsPath));
    const user = findContact.find(list => list.id === id);
    if (!user) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json(user);
    } catch (err) {
    res.status(400).json({ message: 'Ooops...'})
    }
}

const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const findContact = JSON.parse(await fs.readFile(contactsPath));
    const user = findContact.find(list => list.id === id);
    if (!user) {
      return res.status(404).json({ "message": "Not found" })
    }
    const newContacts = findContact.filter(list => list.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return res.status(200).json({ "message": "contact deleted", newContacts });
    } catch (err) {
        res.status(400).json({ message: 'Ooops...'})
    }
}

const addContact = async (req, res) => {  
  console.log('mimo')
  try {
    const { error, value } = contactsValiadation(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
  const newContact = {
        id: nanoid(),
        ...value
    }
   const findContact = JSON.parse(await fs.readFile(contactsPath));
   const newContacts = [...findContact, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return res.status(201).json({ message: 'Contact is added', ...newContacts });
  }
  catch (err) {
        res.status(400).json({ message: 'Ooops...'})
    }
}

const updateContact = async (req, res) => {
  try {
    const { error, value } = contactsValiadation(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      console.log(fieldName)
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
    const { id } = req.params;
    const findContact = JSON.parse(await fs.readFile(contactsPath));
    const user = findContact.find(list => list.id === id);
    if (!user) {
      return res.status(404).json({ "message": "Not found" })
    }
    const newContact = {
        id: id,
        ...value
    }
    const newContacts = [...findContact, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return res.status(201).json({ message: 'Contact is added', newContact });
  }
  catch (err) {
    res.status(400).json({ message: 'Ooops...',})
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
