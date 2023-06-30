const { Contact } = require('../../models');

const { NotFound } = require('http-errors');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new NotFound('Not found');
  }
  res.json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

module.exports = getById;
