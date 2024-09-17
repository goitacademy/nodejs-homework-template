const { Contact } = require('../../models/contact');
const { HttpError, ctrlWrapper } = require('../../helpers');

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = ctrlWrapper(removeContact);