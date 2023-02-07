const { Contact } = require('../../models/contact');

const { requestError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) throw requestError(404, 'Not found');
  res.status(201).json(data);
};

module.exports = updateStatusContact;
