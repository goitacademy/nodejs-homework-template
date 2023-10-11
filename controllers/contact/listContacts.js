const contactList = require('../../models/ContactList');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

async function listContacts(req, res, next) {
  const data = await contactList.listContacts();
  res.status(200).json({ code: 200, data });
}

module.exports = ctrlWrapper(listContacts);
