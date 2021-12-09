const { Contact } = require('../../models');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updateContact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(updateContact);
};

module.exports = updateById;
