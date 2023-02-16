const { updateContact } = require('../../models/index');

const putContact = async (req, res) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing fields' });
  }
  const contact = await updateContact(id, { name, email, phone });
  if (!contact) {
    return res.status(404).json({ message: 'Not found!' });
  }
  res.status(200).json({ contact });
};

module.exports = { putContact };
