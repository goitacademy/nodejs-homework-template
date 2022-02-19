const { updatingOneContactField } = require('../../models/contacts');

const patchContact = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  const contact = await updatingOneContactField(contactId, body);
  if (contact) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' });
};

module.exports = patchContact;
