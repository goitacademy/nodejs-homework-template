const contactList = require('../../models/ContactList');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactList.removeContact(contactId);

  if (!contact) {
    res.status(404).json({ code: 404, message: 'Not found' });
    return;
  }

  res.status(200).json({ code: 200, message: 'contact deleted' });
}

module.exports = ctrlWrapper(removeContact);
