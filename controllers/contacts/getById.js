const { Contact } = require('../../models');
const { httpError } = require('../../utils');

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw httpError(404);
  }
  res.json(result);
};

module.exports = getContactById;
