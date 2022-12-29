const Contacts = require('../../models/contacts');
const { NotFound } = require('http-errors');

const putContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contacts.updateContact(id, req.body);
  if (!contact) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.json({ status: 'success', code: 200, data: { contact } });
};

module.exports = putContactById;
