const { Contacts } = require("../../db/contacts");
const updateStatusContactbyId = async (contactId, { favorite }) => {
  const data = await Contacts.findOneAndUpdate(
    { _id: contactId },
    { $set: { favorite } },
    { new: true }
  );
  return data;
};
module.exports = updateStatusContactbyId;
