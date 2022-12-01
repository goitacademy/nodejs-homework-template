const { Contact } = require('../../models/contact');

const { HTTPError } = require('../../helpers');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HTTPError(404);
  }
  res.json(result);
};

module.exports = getById;
