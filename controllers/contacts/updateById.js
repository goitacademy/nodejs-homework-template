const { NotFound } = require('http-errors');
const contactsOperation = require('../../model/contacts');

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = updateById;
