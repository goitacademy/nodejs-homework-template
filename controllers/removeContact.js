const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname,'../models', 'contacts.json');

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
module.exports=removeContact