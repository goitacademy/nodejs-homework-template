const {updateContact} = require('../../models/contacts');

const updateById = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  } else {
    res.json({status: 'success', code: 200, data: updatedContact});
  }
};

module.exports = updateById;
