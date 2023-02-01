const { Contact } = require('../../models/contact');

module.exports = async (id, favorite) => {
  return await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
};
