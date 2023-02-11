const { Contact } = require('../../schemas/modelContact');

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = { updateStatusContact };
