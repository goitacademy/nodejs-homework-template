const { updateContact } = require('../../service');
const { updateContactSchema } = require('../../utils');

const updateContactController = async (req, res, next) => {
  const { error } = await updateContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(updatedContact);
};

module.exports = updateContactController;
