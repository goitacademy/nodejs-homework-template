const { NotFound } = require('http-errors');
const contactsOperations = require('../../model/contacts');

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.getContactById(id);
  if (!result) {
    throw new NotFound(`Contact with id '${id}' not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getById;