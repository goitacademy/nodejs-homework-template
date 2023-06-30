const { Contact } = require('../../models');

const { NotFound } = require('http-errors');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

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
