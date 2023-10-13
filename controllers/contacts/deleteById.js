const Contact = require('../../models/contact');
const { HttpError } = require('../../helpers');

const deleteById = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Contact deleted' });
};

module.exports = deleteById;
