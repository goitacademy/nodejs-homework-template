const { Contact } = require('../../models');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId);
  res.json({
    status: 200,
    message: `Contact with id=${contactId} delete`,
    data: { result },
  });
};

module.exports = deleteById;
