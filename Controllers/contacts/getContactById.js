const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactId = await Contact.findById(id);
  if (!contactId) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.status(200).json(contactId);
};

module.exports = getContactById;
