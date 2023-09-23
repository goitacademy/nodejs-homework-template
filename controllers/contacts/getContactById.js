const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw httpError(404, 'Not found');
  }

  return res.json(result);
};

module.exports = ctrlWrapper(getContactById);
