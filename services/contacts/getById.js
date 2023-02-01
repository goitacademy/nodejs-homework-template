const { Contact } = require('../../models/contact');

module.exports = async (req) => {
  const { id } = req.params;

  return await Contact.findById(id);
};
