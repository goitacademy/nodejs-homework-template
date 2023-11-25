// getcontacts.js
const { loadContacts } = require('../../controller/contacts');

const getContacts = async (req, res) => {
  try {
    const contacts = await loadContacts();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getContacts;
