const { Contact } = require('../../models');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.remove({ _id: contactId });
  if (!result) {
    const error = new Error(`Contact by id=${{ contactId }} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    message: 'contact deleted',
    code: 200,
    data: { result },
  });
};

module.exports = removeContact;
