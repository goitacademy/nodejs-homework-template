const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const getById = async (req, res) => {
  const contactById = await Contact.findById(req.params.contactId);
  if (!contactById) {
    throw HttpError(404, 'not found');
  }
  res.json(contactById);
};

module.exports = getById;
