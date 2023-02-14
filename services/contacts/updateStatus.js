const { Contact } = require('../../models/contact');

module.exports = async (_id, favorite) => {
  return await Contact.findByIdAndUpdate(
    _id,
    { favorite },
    { new: true }
  );
};
