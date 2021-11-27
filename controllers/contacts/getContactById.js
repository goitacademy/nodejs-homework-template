var { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new NotFound(`id ${id} not found`);
  }
  res.json({
    status: 'succes',
    code: 200,
    data: { result },
  });
};

module.exports = getContactById;
