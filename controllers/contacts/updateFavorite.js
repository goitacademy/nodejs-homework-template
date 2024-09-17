const { Contact } = require('../../models/contact');

const { httpError } = require('../../helpers');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  // {new: true} returns updated document
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;
