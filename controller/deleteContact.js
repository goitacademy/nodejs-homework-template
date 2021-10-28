const {Contact} = require('../model/contactSchema');

const deleteContact = async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  res.status(200).json({message: 'Contact deleted', data: {contact}});
};

module.exports = deleteContact;
