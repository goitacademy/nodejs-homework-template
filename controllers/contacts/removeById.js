const {modelContacts} = require('../../models');

const removeById = async (req, res) => {
  const {contactId} = req.params;
  const deletedContact = await modelContacts.removeContact(contactId);
  if (deletedContact) {
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      data: deletedContact,
    });
  } else {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
};

module.exports = removeById;
