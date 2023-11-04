const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, '../models', 'contacts.json');
const { updateContactSchema } = require('../validation/validation');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: { "message": "missing fields" }});
  }
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex !== -1) {
      const updatedContact = {
        id: contactId,
        ...req.body,
      };

      contacts[contactIndex] = updatedContact;

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
module.exports=updateContact