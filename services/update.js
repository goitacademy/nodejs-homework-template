const { contact } = require("../models");
const { ContactModel } = contact;

const update = async (contactId, contactBody) => {
  const data = await ContactModel.findByIdAndUpdate(contactId, contactBody, {
    new: true,
  });
  return data;
};

module.exports = update;
