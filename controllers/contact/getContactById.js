const contactList = require('../../models/ContactList');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactList.getContactById(contactId);

  if (!contact) {
    res.status(404).json({ code: 404, message: 'Not found' });
    return;
  }

  res.status(200).json({ code: 200, data: contact });
}

module.exports = ctrlWrapper(getContactById);
