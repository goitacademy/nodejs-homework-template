const { Contact } = require('../../models/contact');

module.exports = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
