var { NotFound } = require('http-errors');
const contactsOperations = require('../../model/contacts');

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContactById(id);
  if (!result) {
    throw new NotFound(`id ${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'product deletet',
    data: {
      result,
    },
  });
};

module.exports = removeContactById;
