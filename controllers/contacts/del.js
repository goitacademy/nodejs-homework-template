const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const del = async (req, res) => {
  const deletedContact = await Contact.findByIdAndDelete(req.params.contactId);
  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = del;
