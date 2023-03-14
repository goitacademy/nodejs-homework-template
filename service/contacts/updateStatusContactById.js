const { Contact } = require("../../models");
const updateStatusContactbyId = async (contactId, { favorite }, owner) => {
  const data = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } },
    { new: true }
  );
  return data;
};
module.exports = updateStatusContactbyId;
