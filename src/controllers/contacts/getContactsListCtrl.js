const { listContacts } = require('../../services');

const getContactsListController = async (req, res) => {
  const { id: owner } = req.user;

  // Get all contacts of a user by passing its id.
  const contacts = await listContacts(owner);

  // If not found any contacts, then throw an error.
  if (!contacts.length) {
    return res.status(404).json({ message: 'No contacts found' });
  }

  // Return contacts in the response.
  return res.status(200).json(contacts);
};

module.exports = getContactsListController;
