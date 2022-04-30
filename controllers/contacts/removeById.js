const { Contact } = require('../../models/contact');
const { validationById } = require('../../middlewares');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  validationById(contactId);

  await Contact.findByIdAndRemove(contactId);
  res.json({ message: 'Contact deleted' });
};

module.exports = removeById;
