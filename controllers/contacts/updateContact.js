const { isEmpty } = require('lodash');
const { Contact } = require('../../models/index');
const { HttpSuccess, HttpError } = require('../../helpers');

const updateContact = async (req, res, next) => {
  if (isEmpty(req.body)) {
    throw HttpError({ status: 400, message: 'Missing fields' });
  }
  const { id } = req.params;
  const { user } = req;
  if (user.id !== id) {
    throw HttpError({
      status: 403,
      message: "You can't update contact that doesn't belong to your account",
    });
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError({ status: 404, message: 'Contact not found!' });
  }
  res.statusMessage('Updated successfully').json({ data: result });
};
module.exports = updateContact;
