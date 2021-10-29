const {Contact} = require('../model/contactSchema');

const updateContact = async (req, res, next) => {
  const {contactId} = req.params;

  await Contact.findByIdAndUpdate(contactId, {$set: {...req.body}});

  const newContact = await Contact.findById(contactId);

  res.status(200).json({message: 'Contact updated', data: {newContact}});
};

module.exports = updateContact;
