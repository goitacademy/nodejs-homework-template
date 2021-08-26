const contactsOps = require('../../../model');
const { schemaUpdateContact } = require('../../api/validation');

const updateContacts = async (req, res, next) => {
  try {
    const { error } = schemaUpdateContact.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'missing field' });
    }
    const { contactId: id } = req.params;
    const updatedById = await contactsOps.updateContact(id, req.body);
    if (updatedById) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: updatedById });
    }
    return res
      .status(400)
      .json({ status: 'error', code: 404, message: 'missing fields' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContacts;
