const { Contact } = require('../../models');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    const error = new Error(`Contact with Id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      contact,
    },
  });
};

module.exports = removeContact;
