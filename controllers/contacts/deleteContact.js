const { Contact } = require('../../models');

const deleteContact = async (req, res, next) => {
  const removedContact = await Contact.findByIdAndRemove(req.params.contactId);
  console.log('removed contact', removedContact)

  if (!removedContact) {
    res.status(404).json({ status:"error", code:404, message: "Not found"})
  }
  res.json({ status: "success", code: 200, payload: removedContact})
}

module.exports = deleteContact;