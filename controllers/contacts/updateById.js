const contactOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactOperations.updateContact(contactId, req.body);

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
