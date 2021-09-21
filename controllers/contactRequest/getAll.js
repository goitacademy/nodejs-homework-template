const Contact = require("../../model/contact");
const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "email subscription -_id",
  });
  return results;
};

module.exports = listContacts;
