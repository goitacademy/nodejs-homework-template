const { Contacts } = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contacts.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.status(201).json(result);
};

module.exports = updateById;
