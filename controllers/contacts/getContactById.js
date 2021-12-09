const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await Contact.findOne({ _id: contactId, owner: userId });

  if (!contact || contact === []) {
    throw new NotFound(`contact with ID=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'сontact loaded',
    data: {
      contact,
    },
  });
};

module.exports = getContactById;
