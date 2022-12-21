const { NotFound } = require('http-errors');
// const contactsOperations = require('../../model/contacts');
const { Contact } = require('../../models');

const getById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId);

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
