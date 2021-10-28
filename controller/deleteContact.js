const removeContact = require('../model/removeContact');

const deleteContact = async (req, res, next) => {
  await removeContact(req.params.contactId);
  res.status(200).json({message: 'Contact deleted'});
};

module.exports = deleteContact;
