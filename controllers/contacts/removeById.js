const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw new NotFound();
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      contact,
    },
  });
};

module.exports = removeById;