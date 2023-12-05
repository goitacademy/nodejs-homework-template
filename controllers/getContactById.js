const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname,'../models', 'contacts.json');

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    
    const contact = contacts.find((c) => c.id === contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
module.exports = getContactById