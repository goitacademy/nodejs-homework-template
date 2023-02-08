const contactsOperation = require('../../models/contacts');

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const contactById = await contactsOperation.getContactById(contactId);
  if (!contactById) {
    const error = new Error(`Contact by id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contactById,
    },
  });
};

module.exports = getById;
