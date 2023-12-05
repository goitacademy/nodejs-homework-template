const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname,'../models', 'contacts.json');


const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
module.exports=listContacts