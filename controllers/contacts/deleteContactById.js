const { Contact } = require('../../models');

const { HttpError } = require('../../help');

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndRemove({ _id: contactId });
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json({ message: 'contact deleted' });
};

module.exports = deleteContactById;
