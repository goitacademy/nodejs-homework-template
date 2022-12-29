const Contacts = require('../../models/contacts');
const { NotFound } = require('http-errors');

const delContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contacts.removeContact(id);
  if (!contact) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
    data: { contact },
  });
};

module.exports = delContactById;
