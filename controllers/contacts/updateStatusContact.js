const { Contact } = require('../../models');

const { HttpError } = require('../../help');

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

module.exports = updateStatusContact;
