const { Contact } = require('../../models/contact');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, body.favorite, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
