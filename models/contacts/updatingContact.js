const Contact = require('../../service/schemaContact');

const updatingContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = updatingContact;
