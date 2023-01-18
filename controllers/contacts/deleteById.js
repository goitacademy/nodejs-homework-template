const contactOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result,
    },
  });
};

module.exports = deleteById;
