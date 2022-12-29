const Contacts = require('../../models/contacts');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactId = await Contacts.getContactById(id);
  if (!contactId) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.json({ status: 'success', code: 200, data: { contactId } });
};

module.exports = getContactById;
