const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new NotFound(`Contact with ID=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'сontact loaded',
    data: {
      contact,
    },
  });
};

module.exports = getContactById;
