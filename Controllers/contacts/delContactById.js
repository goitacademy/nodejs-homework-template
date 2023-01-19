const { Contact } = require('../../models');

const { NotFound } = require('http-errors');

const delContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.status(200).json({
    message: 'Contact deleted',
  });
};

module.exports = delContactById;
