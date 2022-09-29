const { ContactModel } = require("../../models/contact");

const remove = async (contactId, userId) => {
  const data = await ContactModel.findByIdAndDelete(contactId, {
    owner: userId,
  });
  return data;
};

module.exports = remove;
