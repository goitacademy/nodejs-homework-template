const { removeContact } = require('../../service');

const deleteContactController = async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (!data) {
    res.status(404).json({ message: 'Not found' });

    return;
  }
  res.json({ message: 'contact deleted' });
};

module.exports = deleteContactController;
