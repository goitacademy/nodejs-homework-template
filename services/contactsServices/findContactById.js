const { Contacts } = require('../../models/contacts');
const { createReject } = require('../../utils');

const findContactById = async (contactId, owner) => {
  const result = await Contacts.find({ _id: contactId, owner });
  if (result.length === 0) {
    throw createReject(404, 'Not found');
  }
  console.log(result);
  return result;
};

module.exports = findContactById;
