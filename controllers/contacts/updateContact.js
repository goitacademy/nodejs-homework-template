const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!contact) {
    const error = new Error(`Contact with Id=${contactId} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: 'success',
    code: 201,
    message: 'contact updated',
    data: {
      contact,
    },
  });
};

module.exports = updateContact;
