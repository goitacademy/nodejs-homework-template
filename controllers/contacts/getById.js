const { Contact } = require('../../models/contact');
const { HttpError, ctrlWrapper } = require('../../helpers');

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({_id: id});
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
