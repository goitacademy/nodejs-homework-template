const Contact = require('../../models/contact');
const { HttpError } = require('../../helpers');

const getById = async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json(contact);
};

module.exports = getById;
