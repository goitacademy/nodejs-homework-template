// updatecontacts.js
const { loadContacts, saveContacts, validateContact } = require('../../controller/contacts');

const updateContacts = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = {
      id: contactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: contacts[contactIndex].favorite,
    };

    contacts[contactIndex] = updatedContact;
    await saveContacts(contacts);
    res.json({ message: 'Contact updated successfully', updatedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = updateContacts;
