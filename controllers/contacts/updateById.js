const { NotFound } = require('http-errors');

// const contactsOperations = require('../../model/contacts');
const { Contact } = require('../../models');

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    cose: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateById;
