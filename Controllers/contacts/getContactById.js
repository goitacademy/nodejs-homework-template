const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactId = await Contact.findById(id);
  if (!contactId) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.json({ status: 'success', code: 200, data: { contactId } });
};

module.exports = getContactById;
