const contactsModel = require('../../models/contacts');

const putContact = async (req, res, next) => {
  const updatedContact = await contactsModel.updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    res.status(404).json({ status: "error", code:404, message: "Not found"})
  }
  res.json({ status: "success", code: 200, payload: updatedContact });
}

module.exports = putContact;