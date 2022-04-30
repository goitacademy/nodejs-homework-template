const { Contact } = require('../../models/contact');
const { validationById } = require('../../middlewares');

const getById = async (req, res) => {
  const { contactId } = req.params;
  validationById(contactId);

  const result = await Contact.findById(contactId, '-createdAt -updatedAt');
  res.json(result);
};

module.exports = getById;
