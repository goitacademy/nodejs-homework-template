const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const getById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await contactsOperations.getContactById(contactId);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

module.exports = getById;
