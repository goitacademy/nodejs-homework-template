const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, 'Not found');
  }

  return res.json(result);
};

module.exports = {
  updateContact: ctrlWrapper(updateContact),
};
