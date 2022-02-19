const { listContacts } = require('../../models/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ status: 'success', code: 200, payload: { contacts } });
};

module.exports = getContacts;
