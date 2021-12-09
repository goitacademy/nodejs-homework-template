const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await Contact.findOneAndDelete({ _id: contactId, owner: userId });

  if (!contact) {
    throw new NotFound(`Contact with Id=${contactId} not found`);
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

module.exports = removeContact;
