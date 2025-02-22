const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const updatingContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatingContact) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatingContact);
};

module.exports = updateStatusContact;