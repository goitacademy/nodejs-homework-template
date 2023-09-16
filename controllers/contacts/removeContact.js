const { Contact } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw httpError(404, 'Not found');
  }

  res.json({
    message: 'contact deleted',
  });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
