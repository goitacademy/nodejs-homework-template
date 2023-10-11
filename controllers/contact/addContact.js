const contactList = require('../../models/ContactList');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

async function addContact(req, res, next) {
  const data = await contactList.addContact(req.body);
  res.status(200).json({ code: 200, data });
}

module.exports = ctrlWrapper(addContact);
