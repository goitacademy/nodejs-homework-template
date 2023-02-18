const { Contact } = require('../../models/contact');

module.exports = async (_id) => {
  return await Contact.findByIdAndDelete(_id);
};
