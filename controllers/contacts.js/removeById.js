const { Contact } = require('../../models');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const removedСontact = await Contact.findByIdAndRemove(contactId);
  if (!removedСontact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeById;
