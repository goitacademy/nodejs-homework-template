const contactsOperations = require('../../models/contacts');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contactsOperations.removeContact(contactId);
  if (!deletedContact) {
    res.status(404).json({
      message: "Not found"
    })
    return;
  }
  res.json({
    message: "contact deleted"
  })
}

module.exports = deleteContact;