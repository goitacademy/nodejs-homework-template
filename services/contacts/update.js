const { ContactModel } = require("../../models/contact");

const update = async (contactId, contactBody, userId) => {
  const data = await ContactModel.findByIdAndUpdate(contactId, contactBody, {
    owner: userId,
    new: true,
  });
  return data;
};

module.exports = update;
