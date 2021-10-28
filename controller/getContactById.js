const {Contact} = require('../model/contactSchema');

const getContactById = async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await Contact.findById(contactId);
  res.status(200).json({message: 'success', data: {contact}});
};

module.exports = getContactById;
