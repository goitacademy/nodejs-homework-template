const { Contact } = require('../../schemas/modelContact');

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = { updateContact };
