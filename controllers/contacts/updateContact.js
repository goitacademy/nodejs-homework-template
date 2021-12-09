const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, req.body, {
    new: true,
  });

  if (!contact) {
    throw new NotFound(`Contact with Id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 201,
    message: 'contact updated',
    data: {
      contact,
    },
  });
};

module.exports = updateContact;
