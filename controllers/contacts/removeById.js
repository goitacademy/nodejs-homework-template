const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  console.log(deleteContact);
  if (!deleteContact) {
    throw HttpError(404, 'Not found');
  }
  res.json('message: contact deleted');
};

module.exports = removeById;
