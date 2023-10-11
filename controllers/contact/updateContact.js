const contactList = require('../../models/ContactList');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactList.updateContact(contactId, req.body);

  if (!contact) {
    res.status(404).json({ code: 404, message: 'Not found' });
    return;
  }

  res.status(201).json({ code: 201, data: contact });
}

module.exports = ctrlWrapper(updateContact);
