const { removeContact } = require('../../models/index');

const deleteContact = async (req, res) => {
  const id = req.params.contactId;

  const contacts = await removeContact(id);

  if (!contacts) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ message: 'contact is deleted' });
};

module.exports = { deleteContact };
