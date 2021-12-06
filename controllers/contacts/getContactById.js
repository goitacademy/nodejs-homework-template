const { Contact } = require('../../models');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    const error = new Error(`Contact with Id=${contactId} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'сontant uploaded',
    data: {
      contact,
    },
  });
};

module.exports = getContactById;
