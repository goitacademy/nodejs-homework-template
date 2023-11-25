// deletecontacts.js
const { loadContacts, saveContacts } = require('../../controller/contacts/');

const deleteContacts = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    const deletedContact = contacts.splice(contactIndex, 1)[0];
    await saveContacts(contacts);
    res.json({ message: 'Contact deleted successfully', deletedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = deleteContacts;
