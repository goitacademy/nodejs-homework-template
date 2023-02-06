const operation = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await operation.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = getContactById;
