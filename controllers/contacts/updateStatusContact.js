const { Contact } = require('../../models/contact');
const { RequestError } = require('../../utils');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw RequestError(400, 'Missing field favorite');
  }
  res.status(201).json(result);
};

module.exports = updateStatusContact;