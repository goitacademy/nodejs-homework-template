const {Contact} = require('../../models');

const removeById = async (req, res) => {
  const {contactId} = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
  return res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
    data: deletedContact,
  });
};

module.exports = removeById;
