const { Contact } = require('../../models/contact');

module.exports = async (id, body) => {
  return await Contact.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
};
