const Contact = require('../../service/schemaContact');

const gettingContactById = async contactID => {
  return Contact.findOne({ _id: contactID });
};

module.exports = gettingContactById;
