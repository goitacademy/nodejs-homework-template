const { Contact, contactAddSchema } = require('../../models');

const { HttpError } = require('../../help');

const updateContactById = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { contactId } = req.params;
  const contactByID = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
  if (!contactByID) {
    throw HttpError(404);
  }
  res.json(contactByID);
};

module.exports = updateContactById;
