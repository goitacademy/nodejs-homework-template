const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname,'../models', 'contacts.json');
const crypto=require('crypto')

const addContact = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: crypto.randomUUID(),
      ...req.body,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.status(201).json({ message: 'Contact added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};



module.exports = addContact