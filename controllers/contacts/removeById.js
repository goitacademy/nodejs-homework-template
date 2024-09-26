const { Contact } = require('../../models/contact');
const { requestError } = require('../../helpers');

const removeById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });

  if (!result) {
    throw requestError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: { result },
  });
};

module.exports = removeById;
