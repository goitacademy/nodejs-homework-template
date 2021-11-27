var { NotFound } = require('http-errors');

const { Contact } = require('../../models');

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
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
