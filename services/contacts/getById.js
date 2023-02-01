const { Contact } = require('../../models/contact');

const getByID = async (req) => {
  const { id } = req.params;

  return await Contact.findById(id);
};

module.exports = getByID;
