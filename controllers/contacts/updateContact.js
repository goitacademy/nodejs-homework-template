const { isEmpty } = require('lodash');
const { Contact } = require('../../models/index');
const { HttpSuccess, HttpError } = require('../../helpers');

const updateContact = async (req, res, next) => {
  if (isEmpty(req.body)) {
    throw HttpError({ status: 400, message: 'Missing fields' });
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError({ status: 404, message: 'Contact not found!' });
  }
  res.json(HttpSuccess({ data: result, message: 'Updated successfully' }));
};
module.exports = updateContact;
