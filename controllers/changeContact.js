const { updateContact } = require('../models/contacts');
const { schemaUpdate } = require('../schemas/joiSchema');

const changeContact = async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const { contactId } = req.params;

    const update = await updateContact(contactId, req.body);

    !update
      ? res.status(404).json({ message: `Contact ${contactId} not found` })
      : res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};
module.exports = { changeContact };
