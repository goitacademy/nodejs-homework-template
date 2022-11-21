const { Contact } = require('../../models/contact');

const { HTTPError } = require('../../helpers');

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HTTPError(404);
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeById;
