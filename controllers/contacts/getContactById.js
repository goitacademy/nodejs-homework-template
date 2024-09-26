const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, 'Not found');
  }

  return res.json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
