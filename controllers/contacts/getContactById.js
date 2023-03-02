const { Contact } = require('../../models/index');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const data = await Contact.findOne({
    _id: id,
    owner: { _id: user.id },
  }).populate('owner', '_id email');

  if (!data) {
    throw HttpError({ status: 404, message: 'Contact not found' });
  }
  res.json({ data });
};
module.exports = getContactById;
