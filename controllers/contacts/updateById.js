const { NotFound } = require('http-errors');

const { updateContact } = require('../../models/contacts');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const contact = await updateContact(contactId, { name, email, phone });

  if (!contact) {
    throw new NotFound();
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateById;
